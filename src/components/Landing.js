import {Grid,Typography,Button} from '@material-ui/core';


import Header from "./components/header/Header";
import Container from '@material-ui/core/Container';




const Landing = () => {
    return (
        <div>
            <Header/>
            <Container maxWidth="lg" style={{ backgroundColor: '#cfe8fc', height: '86vh'}} >
                <Grid container direction='column' xs={4}>
                    <Grid item style={{marginTop:'100px'}}>
                        <Typography variant='h4'>Virtual Meet</Typography>
                    </Grid>

                    <Grid item style={{marginTop:'15px'}}>
                        <Typography variant='h5'> Distance means so little. </Typography>
                    </Grid>

                    <Grid item style={{marginLeft:'70px', marginTop:'40px'}}>
                        <Typography variant='h6'align='left'> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eu at hendrerit metus in.
                        met eu <br/> 
                        Amet eu at hendrerit metus in. Amet eu at hendrerit metus 
                        in.at hendrerit metus in.
                        </Typography>
                    </Grid>

                    <Grid container direction='row' spacing={5} style={{marginTop:'15px'}}>
                        <Grid item style={{marginLeft:'70px'}}>
                            <Button variant="contained" style={{backgroundColor: "#F1F7B3"}}>
                                Join Meeting
                            </Button>
                        </Grid>

                        <Grid item >
                            <Button variant="contained" style={{backgroundColor: "#CBF8BB"}}>
                                Host Meeting
                            </Button>
                        </Grid>
                        
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default Landing
