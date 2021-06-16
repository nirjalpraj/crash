import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState();

  const myVideo = useRef();
  const userVideo = useRef();
 

  const [roomName, setRoomName] = useState();
  const [creator,setCreator] = useState(false);
  const [userStream, setUserStream] = useState();


  let iceServers = {
    iceServers: [
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

      socket.on("created", function () {
        setCreator(true);
      
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 },
          })
          .then(function (stream) {
            /* use the stream */
            setUserStream(stream);
            divVideoChatLobby.style = "display:none";
            userVideo.srcObject = stream;
            userVideo.onloadedmetadata = function (e) {
              userVideo.play();
            };
          })
          .catch(function (err) {
            /* handle the error */
            alert("Couldn't Access User Media");
          });
      });

      socket.on("joined", function () {
        setCreator(false);
      
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 },
          })
          .then(function (stream) {
            /* use the stream */
            setUserStream(stream);
            userVideo.srcObject = stream;
            userVideo.onloadedmetadata = function (e) {
              userVideo.play();
            };
            socket.emit("ready", roomName);
          })
          .catch(function (err) {
            /* handle the error */
            alert("Couldn't Access User Media");
          });
      });

      socket.on("full", function () {
        alert("Room is Full, Can't Join");
      });

      socket.on("ready", function () {
        if (creator) {
          rtcPeerConnection = new RTCPeerConnection(iceServers);
          rtcPeerConnection.onicecandidate = OnIceCandidateFunction;
          rtcPeerConnection.ontrack = OnTrackFunction;
          rtcPeerConnection.addTrack(userStream.getTracks()[0], userStream);
          rtcPeerConnection.addTrack(userStream.getTracks()[1], userStream);
          rtcPeerConnection
            .createOffer()
            .then((offer) => {
              rtcPeerConnection.setLocalDescription(offer);
              socket.emit("offer", offer, roomName);
            })
      
            .catch((error) => {
              console.log(error);
            });
        }
      });

      socket.on("candidate", function (candidate) {
        let icecandidate = new RTCIceCandidate(candidate);
        rtcPeerConnection.addIceCandidate(icecandidate);
      });

      socket.on("offer", function (offer) {
        if (!creator) {
          rtcPeerConnection = new RTCPeerConnection(iceServers);
          rtcPeerConnection.onicecandidate = OnIceCandidateFunction;
          rtcPeerConnection.ontrack = OnTrackFunction;
          rtcPeerConnection.addTrack(userStream.getTracks()[0], userStream);
          rtcPeerConnection.addTrack(userStream.getTracks()[1], userStream);
          rtcPeerConnection.setRemoteDescription(offer);
          rtcPeerConnection
            .createAnswer()
            .then((answer) => {
              rtcPeerConnection.setLocalDescription(answer);
              socket.emit("answer", answer, roomName);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });

      socket.on("answer", function (answer) {
        rtcPeerConnection.setRemoteDescription(answer);
      });

      function OnIceCandidateFunction(event) {
        console.log("Candidate");
        if (event.candidate) {
          socket.emit("candidate", event.candidate, roomName);
        }
      }

      function OnTrackFunction(event) {
        peerVideo.srcObject = event.streams[0];
        peerVideo.onloadedmetadata = function (e) {
          peerVideo.play();
        };
      }
      


   
  }, []);



  return (
    <SocketContext.Provider value={{
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
