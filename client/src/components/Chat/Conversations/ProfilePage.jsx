import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser, tabStatus } from '../../../actions/authActions';
import Loader from '../../Loader';

function iconStyles() {
  return {
    successIcon: {
      color: 'white',
    },
    errorIcon: {
      color: 'white',
    },
    camIcon: {
      color: 'white'
    }
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: '#2196f3',
    height: '30vh',
  },
  loaderPaper: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  setSize: {
    height: 100,
    width: 100,
  },
  appbar: {
    marginTop: 0,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  pic: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cam: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
  },
  form: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
  },
  button: {
    marginTop: '15px',
  },
  input: {
    display: 'none',
  },
  upload: {
    color: 'white',
    fontWeight: 'bold',
  },
}));

function ProfilePage({ auth: { loggedIn, user,token, error, tabVal }, updateUser , tabStatus}) {
  const classes = useStyles();
  const classes123 = makeStyles(iconStyles)();

  const [values, setValues] = React.useState({
    name: user.name,
    email: user.email
  });



  const [loading, setLoading] = React.useState(true)

  function notify(text, type) {
    switch (type) {
      case 'info':
        toast.info(`🦄${text}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 'error':
        toast.error(`🦄${text}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      default: break;
    }
  }

  React.useEffect(() => {
      if(user){
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      }
  }, [user])

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const Token = localStorage.getItem('token')
    updateUser({name: values.name,email: values.email,token: Token})
    if(error === null){
      notify('    Details Updated!', 'info');
    }
    else{
      notify('    Error! Try again', 'error');
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    tabStatus(0)
  }

  return (
    <Grid container className={classes.root}>
      {loading ? (
        <Grid item xs={12}>
          <Paper className={classes.loaderPaper} elevation={0}>
            <Loader />
          </Paper>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Toolbar className={classes.appbar}>
              <Grid item xs={2}>
                <CloseIcon
                  fontSize="large"
                  className={classes123.errorIcon}
                  onClick={handleClick}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" className={classes.title}>
                  Profile
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <DoneIcon
                  fontSize="large"
                  className={classes123.successIcon}
                  onClick={handleClick}
                />
              </Grid>
            </Toolbar>
            <Grid item xs={12} className={classes.pic}>
              <Avatar className={classes.setSize} src="/iamges.png" />
            </Grid>
            <Grid item xs={12} className={classes.cam}>
              <CameraAltIcon fontSize="medium" className={classes123.camIcon} />
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button size="small" component="span" className={classes.upload} >
                  Upload
                </Button>
              </label>
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Name"
                defaultValue={user.name}
                name="userName"
                size="small"
                onChange={handleChange('name')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="userEmail"
                label="Email id"
                id="userEmail"
                defaultValue={user.email}
                size="small"
                onChange={handleChange('email')}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submitHandler}
              >
                Update
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {updateUser, tabStatus})(ProfilePage);
