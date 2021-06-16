import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

const Header = () => {
    return (
        <div>
            <Toolbar>
                <Grid container direction="row-reverse" >
                    <Grid item xs={1}>
                        <Typography variant="h6">
                            <MenuIcon/>
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={1}>
                        <Typography variant="h6">
                            Team
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6">
                            About
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={1}>
                        <Typography variant="h6">
                            Home
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </div>
    )
}

export default Header
