import React, {  Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useHistory, NavLink } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  title: {
    flexGrow: 1,
    padding: '20px',
  },
  button: {
    padding: '0.5rem',
    border: 'none',
    color: '#fff',
    backgroundColor: '#3f51b5',
    fontSize: '1rem',
    fontFamily: 'Roboto,Helvetica, Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    padding: '0.5rem',
  },

  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    height: '10px'
  },

  icons: {
    marginLeft: '20px',
  }
}));

function Copyright() {
  const classes = useStyles();
  
  return (
    <Typography color="textSecondary" align="center">
      <GitHubIcon color="primary" fontSize="small" className={classes.icons} />
      <LinkedInIcon
        color="primary"
        fontSize="small"
        className={classes.icons}
      />
      <LanguageIcon
        color="primary"
        fontSize="small"
        className={classes.icons}
      />
      <TwitterIcon color="primary" fontSize="small" className={classes.icons} />
    </Typography>
  );
}


function Layout(props) {
  const classes = useStyles();
  let history = useHistory();
  const matches = useMediaQuery('(min-width:800px)');

  const logout=()=>{
    props.logout();
    history.push("/login")
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" styles={{ xIndex: '1' }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={6} sm={2}>
              <Typography className={classes.title}>Piper Chat</Typography>
            </Grid>
          </Grid>
          {props.loggedIn ? (
            <button onClick={logout} className={classes.button}>
              Logout
            </button>
          ) : (
            <Fragment>
              <NavLink className={classes.link} to="/login">
                <Typography size="large">Login</Typography>
              </NavLink>
              <NavLink className={classes.link} to="/register">
                <Typography size="large">Register</Typography>
              </NavLink>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        {matches ? (
          <Paper
            elevation={5}
            style={{
              backgroundColor: '#f0f0f0',
              height: '77vh',
              marginTop: '5vh',
              zIndex: '2',
            }}
          >
            {props.children}
          </Paper>
        ) : (
          <Paper
            elevation={5}
            style={{
              backgroundColor: '#f0f0f0',
              height: '72vh',
              marginTop: '5vh',
              zIndex: '2',
            }}
          >
            {props.children}
          </Paper>
        )}
      </Container>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, { logout })(Layout);