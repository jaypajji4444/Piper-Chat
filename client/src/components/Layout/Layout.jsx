import React, { PropTypes } from 'react';
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
import { logoutUser } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';

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
  textTransform: 'none'
  }
}));

function Layout(props) {
  const classes = useStyles();
  let history = useHistory();

  const loggingUserOut = (e) => {
    e.preventDefault();
    logoutUser();
    history.push('/login');
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
            <Button color="inherit" href="/login" className={classes.button}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/login" className={classes.button} onClick={loggingUserOut} >
              Login
            </Button>
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
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
});

export default connect(mapStateToProps, { logoutUser })(Layout);