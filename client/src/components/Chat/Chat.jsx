import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ChatBox from './ChatBox';
import Friends from './Conversations/Friends';
import ProfilePage from './Conversations/ProfilePage';

import { connect } from 'react-redux';
import { tabStatus } from '../../actions/authActions';

import socketIOClient from 'socket.io-client';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    height: '100%',
    borderRadius: 0,
    width: '100%'
  },
  sidebar: {
    zIndex: 8,
  },
  tabs: {
    borderRadius: 0,
    height: '60px'
  },
  labels: {
      padding: '15px',
      fontWeight: 'bold'
  }
}));

function Chat({ auth: { loggedIn, tabVal , user , token }, tabStatus }) {
  const classes = useStyles();
  let socket = socketIOClient("http://localhost:5000");
  socket.on("connection",()=>{
    console.log("gi")
  })
  const matches = useMediaQuery('(min-width:800px)');

  const handleChange = (e, newVal) => {
    if(tabVal === 0){
      tabStatus(1)
    }
    else{
      tabStatus(0)
    }
  };
  useEffect(()=>{
    socket.on("privateMessage",(message)=>{
      console.log("From Server:",message)
    })
    
  },[socket])
    const openChat=async(otherUser)=>{
      console.log(otherUser._id)
      console.log("current:",user._id)
      const dataObj = {
        to:user._id,
        from:otherUser._id
      }
      socket.emit("authenticate",token)

      const res = await fetch("http://localhost:5000/api/v1/chat",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(dataObj)
      })
      
      const chat = await res.json()
      socket.emit("open chat",chat._id)
     
    }

    const sendMessage=(message)=>event=>{
    
    event.preventDefault()
    console.log(message)
      
    socket.emit("privateMessage",message)
    }
  return (
    <React.Fragment>
      {matches ? (
        <Grid container className={classes.root}>
          <Grid item md={4} className={classes.sidebar}>
            <Paper className={classes.paper} square elevation={5}>
              <Paper square elevation={5} className={classes.tabs}>
                <Tabs
                  onChange={handleChange}
                  variant="fullWidth"
                  value={tabVal}
                  indicatorColor="primary"
                  textColor="primary"
                  className={classes.tabs}
                >
                  <Tab label="Chats" className={classes.labels} />
                  <Tab label="Profile" className={classes.labels} />
                </Tabs>
              </Paper>
              {tabVal === 0 && <Friends openChat={openChat}/>}
              {tabVal === 1 && <ProfilePage />}
            </Paper>
          </Grid>
          <Grid item md={8}>
            <ChatBox sendMessage={sendMessage} />
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root}>
          <Paper className={classes.paper} square elevation={5}>
            <Paper square elevation={5} className={classes.tabs}>
              <Tabs
                onChange={handleChange}
                variant="fullWidth"
                value={tabVal}
                indicatorColor="primary"
                textColor="primary"
                className={classes.tabs}
              >
                <Tab label="Chats" className={classes.labels} />
                <Tab label="Profile" className={classes.labels} />
              </Tabs>
            </Paper>
            {tabVal === 0 && <Friends />}
            {tabVal === 1 && <ProfilePage />}
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { tabStatus })(Chat);
