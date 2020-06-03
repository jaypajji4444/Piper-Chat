import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  title: {
    flexGrow: 1,
    padding: '20px',
    marginLeft: '80px',
  },
}));

export default function Layout(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" styles={{ xIndex: '1' }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Piper Chat
          </Typography>
          <Button color="inherit" href="/login">Login</Button>
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
