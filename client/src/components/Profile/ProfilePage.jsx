import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  }
}));

function ProfilePage(props){
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      Profile
    </Grid>
  );
};

export default ProfilePage;
