import React, {  Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useHistory, NavLink } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  title: {
    flexGrow: 1,
    padding: '20px',
    fontSize:"1.5rem",
    fontWeight:"bold"
  },
  username: {
   
    padding: '20px',
    fontSize:"1.5rem",
    fontWeight:"bold"
  },
  button: {
    padding: '0.5rem',
    border: 'none',
    color: '#fff',
    backgroundColor: '#3f51b5',
    fontSize: '0.75rem',
    marginLeft: '25px',
    fontFamily: 'Roboto,Helvetica, Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem',
    fontSize: '0.75rem',
    marginLeft: '25px',
    fontFamily: 'Roboto,Helvetica, Arial, sans-serif',

    lineHeight: '1.5',
  },

  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    height: '10px',
  },

  icons: {
    marginLeft: '20px',
  },

  speedDialLarge: {
    position: 'absolute',
    bottom: '5vh',
    right: '5vh',
  },

  speedDialSmall: {
    position: 'absolute',
    bottom: '2vh',
    right: '2vh'
  },

  exampleWrapper:{
    height: '2px',
    width: '2px'
  },

  copyright: {
    fontSize: '0.7rem',
    marginRight: '7vh'
  }
}));

const actions = [
  {
    icon: <GitHubIcon color="primary" fontSize="small" />,
    name: 'Github',
  },
  {
    icon: <LinkedInIcon color="primary" fontSize="small" />,
    name: 'LinkedIn',
  },
  {
    icon: <LanguageIcon color="primary" fontSize="small" />,
    name: 'Website',
  },
  {
    icon: (
      <TwitterIcon color="primary" fontSize="small" />
    ),
    name: 'Twitter',
  }
];

function Copyright() {
  const classes = useStyles();
  
  return (
    <Typography
      color="textSecondary"
      align="center"
      className={classes.copyright}
    >
      <span> Made by: </span>
      <span>
        <Link underline="none">Jash Mehta</Link>
      </span>
      <span> and </span>
      <span>
        <Link underline="none">Jay Mehta</Link>
      </span>
    </Typography>
  );
}


function Layout({auth:{loggedIn,user},logout,children}) {
  const classes = useStyles();
  let history = useHistory();
  const matches = useMediaQuery('(min-width:800px)');

  const [direction] = React.useState('up');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const chats = () => {
    history.push("chat")
  }

  const logoutUser=()=>{
    logout();
    history.push("/login")
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" styles={{ xIndex: '1' }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={6} sm={2}>
              <Typography className={classes.title}>Piper Chat</Typography>
            </Grid>
            <Grid item xs={1} sm={2}>
              
            </Grid>
            <Grid item xs={4} sm={2}>
  <Typography className={classes.username}>Welcome,{user?`${user.name}`:null}</Typography>
            </Grid>

          </Grid>
          {loggedIn ? (
            <Fragment>
              <Button size="small" onClick={chats} className={classes.button}>
                Chats
              </Button>
              <Button size="small" onClick={logoutUser} className={classes.button}>
                Logout
              </Button>
              {user && user.role==="admin"?(<NavLink className={classes.link} to="/admin">
                ADMIN
              </NavLink>):null}
            </Fragment>
          ) : (
            <Fragment>
              <NavLink className={classes.link} to="/login">
                <Typography size="large">Login</Typography>
              </NavLink>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        {matches ? (
          <React.Fragment>
            <Paper
              elevation={5}
              style={{
                backgroundColor: '#f0f0f0',
                height: '77vh',
                marginTop: '5vh',
                zIndex: '2',
              }}
            >
              {children}
            </Paper>
            <div className={classes.exampleWrapper}>
              <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDialLarge}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClose}
                  />
                ))}
              </SpeedDial>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Paper
              elevation={5}
              style={{
                backgroundColor: '#f0f0f0',
                height: '72vh',
                marginTop: '5vh',
                zIndex: '2',
              }}
            >
              {children}
            </Paper>
            <div className={classes.exampleWrapper}>
              <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDialSmall}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClose}
                  />
                ))}
              </SpeedDial>
            </div>
          </React.Fragment>
        )}
      </Container>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Layout);