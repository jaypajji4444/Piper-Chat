import React, { useEffect , useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';  

import ChatBox from './ChatBox';
import Friends from './Conversations/Friends';
import ProfilePage from './Conversations/ProfilePage';

import { connect } from 'react-redux';
import { newChat , addMessage, openBox } from "../../actions/chatActions"
import chatSocket from "../../utils/webSockets"



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    height: '100%',
    borderRadius: 0,
    width: '100%',
  },
  sidebar: {
    zIndex: 8,
  },
  tabs: {
    borderRadius: 0,
    height: '60px',
  },
  labels: {
    padding: '15px',
    fontWeight: 'bold',
  },
  contentTitleFull: {
    marginTop: '150px',
    textAlign: 'center',
  },
  contentFull: {
    flexGrow: 1,
    marginTop: '40px',
    textAlign: 'center',
    color: 'grey',
  },
}));

function Chat({ auth: { loggedIn, user , token }, chat:{chat, displayBox} , newChat , addMessage, openBox}) {
  const classes = useStyles();

  const matches = useMediaQuery('(min-width:800px)');

  const [showChat,setShowChat] = useState(0);
  const [otherUser,setOtherUser] = useState("");
  const [tab, setTab] = useState(0);

  const handleChange = (e, newVal) => {
    setTab(newVal);
  };


  useEffect(()=>{
    chatSocket.establishConnection()
    chatSocket.receiveChat()
    chatSocket.receiveMessage()
    chatSocket.eventEmitter.on('add-message-response',(data)=>{
      addMessage(data)
    })
  
  },[])
  
  const openChat =async(otherUser)=>{
    openBox(1)
    newChat(user,otherUser,token)
    setShowChat(1)
    setOtherUser(otherUser.name)
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
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  className={classes.tabs}
                >
                  <Tab label="Chats" className={classes.labels} />
                  <Tab label="Profile" className={classes.labels} />
                </Tabs>
              </Paper>
              {tab === 0 && <Friends openChat={openChat} />}
              {tab === 1 && <ProfilePage />}
            </Paper>
          </Grid>
          <Grid item md={8}>
            {showChat ? (
              <ChatBox otherUser={otherUser} chat={chat} showChat={showChat} />
            ) : (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="h3" className={classes.contentTitleFull}>
                    Welcome to Piper Chat!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    className={classes.contentFull}
                  >
                    Click on any of your conversations to open a chat...
                  </Typography>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root}>
          <Paper className={classes.paper} square elevation={5}>
            {showChat && displayBox ? (
              <ChatBox otherUser={otherUser} chat={chat} />
            ) : (
              <React.Fragment>
                <Paper square elevation={5} className={classes.tabs}>
                  <Tabs
                    onChange={handleChange}
                    variant="fullWidth"
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    className={classes.tabs}
                  >
                    <Tab label="Chats" className={classes.labels} />
                    <Tab label="Profile" className={classes.labels} />
                  </Tabs>
                </Paper>
                {tab === 0 && <Friends openChat={openChat} />}
                {tab === 1 && <ProfilePage />}
              </React.Fragment>
            )}
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chat: state.chat
  };
};
export default connect(mapStateToProps, { newChat , addMessage, openBox})(Chat);
