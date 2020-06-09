import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux"
import {fetchUsers} from "../../../actions/chatActions"


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
    justifyContent: 'center',
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
    height: '10vh'
  },
  list: {
    width: '100%'
  }
}));

const Friends = ({fetchUsers,users,openChat}) => {
  const classes = useStyles();


  useEffect(()=>{
    console.log("hello")
    fetchUsers()
  },[fetchUsers])

  return (
    <Grid container className={classes.root}>
      <List dense className={classes.list}>
        {users?
        users.map((element,value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <React.Fragment key={value}>
              <ListItem  className={classes.listItem} onClick={()=>openChat(element)} >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={element.name} />
                <ListItemSecondaryAction>
                  <DeleteIcon color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })
        :<div><h1>Loading....</h1></div>
      }
      </List>
    </Grid>
  );
};

const mapStateToProps = (state)=>{
  return{
    users : state.chat.users
  }
}

export default connect(mapStateToProps,{fetchUsers})(Friends);
