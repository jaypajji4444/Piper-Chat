import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { forgotPass } from '../../actions/authActions';

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

function ForgotPass({ auth: {error, loggedIn}, forgotPass }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: ''
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
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
        default:
          break;
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({
      email: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    forgotPass(values.email);
    if (error === null) {
      notify('    Check you mail!', 'info');
    } else {
      notify('    This email does not exist', 'error');
    }
  };

  if (loggedIn) {
    return <Redirect to="/chat" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Id"
            name="email"
            onChange={handleChange('email')}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Reset
          </Button>
          <Grid container>
            <Grid item xs={12} className={classes.link}>
              <Link to="/register" className={classes.underline}>
                Not yet registered? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.link}>
              <Link to="/login" className={classes.underline}>
                Try loggin in again ...
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps, { forgotPass })(ForgotPass);
