import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';


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

  link: {
    textAlign: 'center',
  },

  underline: {
    textDecoration: 'none',
  },
}));

function Admin({ auth : {user} }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    by: '',
  });

 

  function notify(text, type) {
    switch (type) {
      case 'info':
        toast.info(`${text}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 'error':
        toast.error(`${text}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      default: break
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

    const data = { email: values.email, by: values.by };
    const reqBody = JSON.stringify(data);

        fetch(`http://localhost:5000/api/v1/auth/sendInvite/${values.email}`, {
          method: 'PUT',
          body: reqBody,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((resData) => {
            if(resData.success === true){
                notify('    Accepted!', 'info');
            }
            else{
                notify('    Something went wrong', 'error');
            }
          })
          .catch((err) => console.log(err));

  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
  {user?<div>{user.role}</div>:<div>Accept INvitess</div>}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Accepted by"
            type="text"
            id="password"
            onChange={handleChange('by')}
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
            Accept
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
   auth:state.auth
  };
};
export default connect(mapStateToProps, { loadUser })(Admin);
