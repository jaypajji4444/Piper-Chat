import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import socketIOClient from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  headerRow: {
    maxHeight: 60,
    zIndex: 5,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    color: theme.palette.primary.dark,
  },
  messageContainer: {
    height: '100%',
  },
  messagesRow: {
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  newMessageRow: {
    width: '100%',
    padding: theme.spacing(0, 2, 1),
  },
  inputRow: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    padding: '10px',
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
  },
  listItem: {
    width: '80%',
  },
  sendIcon: {
    marginBottom: '10px',
  },
}));

const ChatBox = ({auth:{loggedIn,user,token}}) => {
  const classes = useStyles();
  let socket = socketIOClient("http://localhost:5000");
  // This is just for testing
  // authenticate => registers current user socket (while login)
  // open chat => a(current)'s and b(other)'s chat object and prev msg if any
  // privateMessage => send new message
  useEffect(() => {
    if(token!==null){
      console.log("col")
      socket.emit("authenticate",token)
    }
    socket.on("chat hist",(data)=>{
      console.log(data)
    })
    socket.on("privateMessage",(data)=>{
      console.log(data)
    })
    socket.emit("open chat",("5edb978490dba34cecf6f8df"))
  

}, [loggedIn,token]);

const sendMessage=(e)=>{
  e.preventDefault()
  console.log("hwllo")
 
  socket.emit("privateMessage",{
    message:{
      from:user._id,
      to:"5edb9367492a523a786480e5",
      body:"hello from "+user._id
  }
})
}


  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.headerRow}>
        <Paper className={classes.paper} square elevation={4}>
          <Toolbar>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography
              color="inherit"
              variant="h6"
              
            >
              {loggedIn && user? user.name : <div>User</div>}
            </Typography>
          </Toolbar>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.messageContainer}>
          <Grid item xs={12} className={classes.messagesRow}></Grid>
          <Grid item xs={12} className={classes.inputRow}>
            <form className={classes.form}>
              <Grid
                container
                className={classes.newMessageRow}
                alignItems="flex-end"
              >
                <Grid item xs={11}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={1}>
                  
                    <button onClick={sendMessage}>send</button>
          
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps=(state)=>{
  return{
    auth:state.auth
  }
}
export default connect(mapStateToProps,null)(ChatBox);
