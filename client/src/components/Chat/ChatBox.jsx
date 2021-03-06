import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { openBox } from '../../actions/chatActions';
import chatSocket from "../../utils/webSockets"

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
    maxHeight: '50vh',
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
  sendIcon: {
    marginBottom: '10px',
  },
  chatMessages: {
    borderTop: '1px solid rgba(0, 0, 0, .05)',
    padding: '10px',
    overflow: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'flex-start',
    flex: '1',
  },
  messageBoxHolder: {
    width: '100%',
    margin: '0 0 15px',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-end',
  },
  messageBox: {
    padding: '6px 20px',
    borderRadius: '6px 0 6px 0',
    position: 'relative',
    background: 'rgba(137, 207, 240, .3)',
    border: '2px solid rgba(25, 181, 254, .3)',
    color: 'black',
    fontSize: '19px',
  },

  messagePartner: {
    padding: '6px 20px',
    borderRadius: '6px 0 6px 0',
    position: 'relative',
    background: 'white',
    border: '2px solid rgba(0, 0, 0, .15)',
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: '19px',
  },
}));



const ChatBox = ({auth:{loggedIn,user,token},chat:{chat,messages} , otherUser, openBox}) => {
  const classes = useStyles();
  
  const [formData,setFormdata]=useState({
    message:""
  })


const {message} = formData; 

const goBackToFriends = (e) => {
  e.preventDefault();
  openBox(0);
}

const changeHandler=(e)=>{
    setFormdata({
      message:e.target.value
    })
}

// useEffect(()=>{scrollToBottom()}, [chat]);

const sendMessage=(message)=>event=>{
  event.preventDefault()
  //socket.emit("privateMessage",message)
  chatSocket.sendMessage(message)

  // scrollToBottom()

  setFormdata({message: ""})
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
              <ArrowBackIcon onClick={goBackToFriends} />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography color="inherit" variant="h6">
              {loggedIn && otherUser ? otherUser : <div>User name</div>}
            </Typography>
          </Toolbar>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.messageContainer}>
          <Grid item xs={12} className={classes.messagesRow}>
                  <div className={classes.chatMessages}>
                    {messages && messages.length>0?
                    messages.map((message)=>{
                      return (
                      <div className={classes.messageBoxHolder} key={message._id}>
                          <div className={user._id===message.from?classes.messageBox:classes.messagePartner}>
                          {message.body}
                        </div>
                      </div>
                      );
                     }): null
                    }
                 </div>
          </Grid>
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
                    onChange={changeHandler}
                    value={message}
                    margin="dense"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    type="submit"
                    className={classes.sendIcon}
                    onClick={sendMessage(message)}
                    disabled={message.length === 0}
                  >
                    <SendIcon color="primary" />
                  </IconButton>
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
    auth:state.auth,
    chat : state.chat,
    displayBox: state.chat.displayBox
  }
}
export default connect(mapStateToProps, {openBox})(ChatBox);
