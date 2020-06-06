import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = (props, loggedIn) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (
          loggedIn
        ) {
          return <props.component.Component {...props} />;
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