import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

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
    height: '10vh',
  },
  list: {
    width: '100%',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    height: '36px',
    width: '36px',
  },
  buttonPrev: {
    height: '36px',
    width: '36px'
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -3,
    left: -3,
    zIndex: 1,
  },
  addIcon: {
    height: '22px',
    width: '22px',
  },
}));

const AllUsers = (props) => {

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonPrev]: !success
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };


  return (
    <Grid container className={classes.root}>
      <List dense className={classes.list}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <React.Fragment>
              <ListItem key={value} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`User name of person ${value + 1}`}
                />
                <ListItemSecondaryAction>
                  <div className={classes.wrapper}>
                    <Fab
                      aria-label="save"
                      color="primary"
                      className={buttonClassname}
                      onClick={handleButtonClick}
                    >
                      {success ? <CheckIcon className={classes.addIcon} /> : <AddIcon className={classes.addIcon} />}
                    </Fab>
                    {loading && (
                      <CircularProgress
                        size={42}
                        className={classes.fabProgress}
                      />
                    )}
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Grid>
  );
};

export default AllUsers;
