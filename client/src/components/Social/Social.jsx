import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ChatBox from '../Chat/ChatBox';
import MyFriends from './MyFriends';
import AllUsers from './AllUsers';

import { connect } from 'react-redux';
import { tabSocial } from '../../actions/authActions';

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
}));

function Social({ auth: { loggedIn, tabValSocial }, tabSocial }) {
  const classes = useStyles();

  const matches = useMediaQuery('(min-width:800px)');

  const handleChange = (e, newVal) => {
    if (tabValSocial === 0) {
      tabSocial(1);
    } else {
      tabSocial(0);
    }
  };

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
                  value={tabValSocial}
                  indicatorColor="primary"
                  textColor="primary"
                  className={classes.tabs}
                >
                  <Tab label="My Friends" className={classes.labels} />
                  <Tab label="All Users" className={classes.labels} />
                </Tabs>
              </Paper>
              {tabValSocial === 0 && <MyFriends />}
              {tabValSocial === 1 && <AllUsers />}
            </Paper>
          </Grid>
          <Grid item md={8}>
            <ChatBox />
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root}>
          <Paper className={classes.paper} square elevation={5}>
            <Paper square elevation={5} className={classes.tabs}>
              <Tabs
                onChange={handleChange}
                variant="fullWidth"
                value={tabValSocial}
                indicatorColor="primary"
                textColor="primary"
                className={classes.tabs}
              >
                <Tab label="My Friends" className={classes.labels} />
                <Tab label="All Users" className={classes.labels} />
              </Tabs>
            </Paper>
            {tabValSocial === 0 && <MyFriends />}
            {tabValSocial === 1 && <AllUsers />}
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
export default connect(mapStateToProps, { tabSocial })(Social);
