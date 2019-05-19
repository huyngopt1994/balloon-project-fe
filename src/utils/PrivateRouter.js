import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, logout, mySession, ...rest }) => {
    if (!isAuthenticated) {
        return <Redirect to="/admin/auth/login"/>;
    }
    return <Route {...rest} render={props => <Component logout={logout} {...props} />}/>;
};

PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    mySession: PropTypes.object.isRequired,
};

export default PrivateRoute;
