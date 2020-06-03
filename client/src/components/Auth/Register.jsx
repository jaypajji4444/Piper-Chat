import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';

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
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
  });

      function notify(text, type) {
        switch (type) {
          case 'info':
            toast.info(`🦄${text}`, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          case 'error':
            toast.error(`🦄${text}`, {
              position: 'top-right',
              autoClose: 2000,
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

    const reqBody = {
        name: values.name,
        email: values.email,
        password: values.password
    }

    fetch(`http://localhost:5000/api/v1/auth/register`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
            notify('  Registration Successful!!!', 'info');
        } else {
            notify('  Incorrect details :(', 'error');
        }
      })
      .catch((err) => console.log);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            onChange={handleChange('name')}
            autoFocus
          />
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange('password')}
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
            Register
          </Button>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <Link href="/login" variant="body2">
                Registered already? Login Here!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;