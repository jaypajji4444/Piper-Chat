import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log(rest.loggedIn)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.loggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(ProtectedRoute);