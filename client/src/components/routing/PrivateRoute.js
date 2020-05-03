import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuth, loading }, ...rest }) => (
  <Route
    {...rest} //make sure it loads with everything else that was passed to is (except component and auth)
    render={
      (
        props // to use it the props passed in, in case isAuth or Loading is true (else statement)
      ) =>
        !isAuth && !loading ? ( //it is not auth and not loading?
          <Redirect to='/login' /> //then redirect to login page
        ) : (
          <Component {...props} />
        ) //if not, just render the component that is passed in normally, with all its arguments (in this case, props)
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
