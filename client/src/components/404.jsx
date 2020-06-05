import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
    flexGrow: 1,
    height: '100vh',
  },
  title: {
    flexGrow: 1,
    padding: '20px',
    textAlign: 'center',
  },
  marginFull: {
    height: '60px',
    width: '300px'
  },
  contentTitleFull: {
    marginTop: '150px',
    textAlign: 'center',
  },
  contentFull: {
    flexGrow: 1,
    marginBottom: '40px',
    textAlign: 'center',
    color: 'grey',
  },
  mainFull: {
    textAlign: 'center',
    color: 'green',
  },
  marginSmall: {
    height: '50px',
  },
  contentTitleSmall: {
    marginTop: '20vh',
    fontSize: '30px',
    textAlign: 'center',
  },
  contentSmall: {
    flexGrow: 1,
    marginTop: '40px',
    marginBottom: '10px',
    textAlign: 'center',
    color: 'grey',
    fontSize: '15px'
  },
  mainSmall: {
    textAlign: 'center',
    color: 'green',
    fontSize: '15px'
  }
}));

const NoMatchPage = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:800px)');
  let history = useHistory();

  const redirectToHome = (e) => {
    e.preventDefault();
    console.log("hello")
    history.push("/")
  }
   
  return (
    <div className={classes.root}>
      <CssBaseline />
      {matches ? (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.contentTitleFull}>
                404 error - Page not found
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.contentFull}>
                If you are here because your invite has not been accepted,
                please be patient! Although if you are here due to some other
                reason please click the button below.
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={classes.marginFull}
                onClick={redirectToHome}
              >
                Go back to home
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.contentTitleSmall}>
                404 error - Page not found
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.contentSmall}>
                If you are here because your invite has not been accepted,
                please be patient! Although if you are here due to some other
                reason please click the button below.
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={classes.marginSmall}
                onClick={redirectToHome}
              >
                Home
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default NoMatchPage;
