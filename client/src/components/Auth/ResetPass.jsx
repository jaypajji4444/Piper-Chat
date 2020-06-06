import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { resetPass } from '../../actions/authActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    marginTop: '55px',
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  link: {
    textAlign: 'center',
  },

  underline: {
    textDecoration: 'none',
  },
}));

function ResetPass({ resetPass, loggedIn, resetDone, authRedirectPath }) {
  const classes = useStyles();

  const { resettoken } = useParams();

  const [fetchSuccess, setFetchSuccess] = React.useState(false);

  const [values, setValues] = React.useState({
    newPassword: '',
    confirmPassword: '',
  });

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
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.newPassword === values.confirmPassword) {
      resetPass({
        password: values.newPassword,
        resetToken: resettoken,
      });
      if (resetDone === true) {
        notify('    Login Successful!', 'info');
        setFetchSuccess(true);
      } else {
        notify('    Invalid Credentials', 'error');
      }
    } else {
      notify('    Passwords do not match', 'error');
    }
  };

  if (fetchSuccess) {
    return <Redirect to={authRedirectPath} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new"
            label="Set new password"
            name="new"
            onChange={handleChange('newPassword')}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm new password"
            type="password"
            id="password"
            onChange={handleChange('confirmPassword')}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Confirm
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error,
  };
};
export default connect(mapStateToProps, { resetPass })(ResetPass);
