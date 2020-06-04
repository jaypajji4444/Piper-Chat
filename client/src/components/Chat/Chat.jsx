import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ChatBox from './ChatBox';
import Friends from './Friends';
import ProfilePage from '../Profile/ProfilePage'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    height: '100%',
    borderRadius: 0,
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

function Chat() {

  const classes = useStyles();
  const [tab, setTab] = React.useState(0);

  const handleChange = (e, newVal) => {
    setTab(newVal);
  };

  return (
    <React.Fragment>
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
            {tab === 0 && <Friends />}
            {tab === 1 && <ProfilePage />}
          </Paper>
        </Grid>
        <Grid item md={8}>
          <ChatBox />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Chat;
