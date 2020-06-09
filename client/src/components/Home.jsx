import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"

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
  },
  contentTitleFull: {
    marginTop: '150px',
    textAlign: 'center',
  },
  contentFull: {
    flexGrow: 1,
    marginBottom: '60px',
    textAlign: 'center',
    color: 'grey',
  },
  mainFull: {
    textAlign: 'center',
    color: 'green',
  },
  marginSmall: {
    height: '60px',
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

function Home({loggedIn}) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:800px)');

    const [mailId, setMailId] = React.useState({
      email: '',
      success: false
    });

    function notify(text, type) {
      switch (type) {
        case 'info':
          toast.info(`${text}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          break;
        case 'error':
          toast.error(`${text}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          break;
          default:break
      }
    }

    const handleChange = (prop) => (event) => {
      setMailId({
        [prop]: event.target.value,
      });
    };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {email:mailId.email, by: "anonymous"}
    const reqBody = JSON.stringify(data)

    fetch('http://localhost:5000/api/v1/auth/reqInvite', {
      method: 'POST',
      body: reqBody,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res=>res.json())
    .then((resData) => {
      console.log(resData)
      if(resData.success === true){
        setMailId({email: '',success: true})
        notify('  Thankyou for sharing!', 'info');
      } else {
        if(resData.error === 'Duplicate entry'){
          notify('   There is an existing account with same mailId', 'error')
        }
        if(resData.error === 'Email could not be sent'){
          notify('   Connection error, try again','error')
        }
      }
    })
    .catch(err=>console.log(err))    
  
  }
if(loggedIn){
  return <Redirect to="/chat" />
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" styles={{ xIndex: '1' }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.title}>Piper Chat</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {matches ? (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.contentTitleFull}>
                Sorry, it's invite only.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.contentFull}>
                Give us your email address and we will try to get you in!
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="outlined-required"
                label="Email id"
                value={mailId.email}
                variant="outlined"
                fullWidth="true"
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={classes.marginFull}
                endIcon={<SendRoundedIcon>Sign Up</SendRoundedIcon>}
                onClick={submitHandler}
              >
                send
              </Button>
            </Grid>
            {mailId.success ? (
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.mainFull}>
                  We have recorded your response. Please check your inbox ...
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Container>
      ) : (
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.contentTitleSmall}>
                Sorry, it's invite only.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.contentSmall}>
                Give us your email address and we will try to get you in!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Email id"
                value={mailId.email}
                variant="outlined"
                fullWidth="true"
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={classes.marginSmall}
                endIcon={<SendRoundedIcon>Sign Up</SendRoundedIcon>}
                onClick={submitHandler}
              >
                send
              </Button>
            </Grid>
            {mailId.success ? (
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.mainSmall}>
                  We have recorded your response. We will drop a mail as soon as
                  possible ...
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
    loggedIn:state.auth.loggedIn
  }
}

export default connect(mapStateToProps,null)(Home);