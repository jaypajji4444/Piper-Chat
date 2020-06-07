import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({component:Component,auth:{loggedIn},...rest}) => {
  return (
   <Route {...rest}
   render={(props)=>loggedIn? <Component {...props}/>:<Redirect to="/login" />}
   />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);