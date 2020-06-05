import React, { PropTypes, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useHistory, Link, NavLink } from 'react-router-dom';


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
  padding:"0.5rem",
  border:"none",
  color: "#fff",
  backgroundColor: "#3f51b5",
  fontSize: "1rem",
  fontFamily: "Roboto,Helvetica, Arial, sans-serif",
  fontWeight: "400",
  lineHeight: "1.5"

  },
  link:{
    color:'inherit',
    textDecoration:"none",
    padding:"0.5rem"

  }
}));

function Layout(props) {
  const classes = useStyles();
  let history = useHistory();

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
              <button onClick={logout} className={classes.button} >Logout</button>
          ) : (
            <Fragment>
              <NavLink className={classes.link} to='/login'>
                  <Typography size='large' >Login</Typography>
              </NavLink>
              <NavLink className={classes.link} to='/register'>
                  <Typography size='large' >Register</Typography>
              </NavLink>
          </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Paper
          elevation={5}
          style={{
            backgroundColor: '#f0f0f0',
            height: '80vh',
            marginTop: '5vh',
            zIndex: '2',
          }}
        >
          {props.children}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, { logout })(Layout);