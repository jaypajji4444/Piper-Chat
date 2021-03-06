import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import {connect} from "react-redux"
import {register} from "../../actions/authActions"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
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

  register: {
    marginTop: '55px'
  }
}));

function Register({register,authRedirectPath,loggedIn,error }) {
  const classes = useStyles();
  const { id } = useParams();
  
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
  });

    
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    register({name: values.name,email: id,password: values.password})
   
  };

  if(authRedirectPath==="/login"){
    return <Redirect to="/login"/>
  }
  if(loggedIn){
    return <Redirect to="/chat" />
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.register}>
            Register here!
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
              defaultValue={id}
              InputProps={{
                readOnly: true,
              }}
              id="email"
              label="Email Id"
              name="email"
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
              <Grid item xs={12} className={classes.link}>
                <Link to="/login" className={classes.underline}>
                  Registered already? Login Here!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
    </Container>
  );
}

const mapStateToProps=(state)=>{
  return{
    authRedirectPath:state.auth.authRedirectPath,
    loggedIn:state.auth.loggedIn,
    error:state.auth.error
  }
}

export default connect(mapStateToProps,{register})(Register)