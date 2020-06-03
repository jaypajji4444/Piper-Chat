import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));

export default function Layout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container        >
        <Paper
          elevation={5}
          style={{
            backgroundColor: '#f0f0f0',
            height: '80vh',
            marginTop: '10vh',
          }}
        />
      </Container>
    </React.Fragment>
  );
}
