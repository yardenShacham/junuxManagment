import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {appInjector} from '../core/appInjector';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => appInjector.get('authService').getCurrentUser() ? true : false;

const PRIVATE_ROOT = '/private';
const PUBLIC_ROOT = '/login';

const AuthRoute: any = ({component, ...props}) => {
    const {isPublic} = component;
    if (isAuthenticated()) {
        //User is Authenticated
        return <Route {...props} component={component}/>;
    }
    else {
        //User is not Authenticated
        if (!isPublic) {
            //If the route is private the user is redirected to the app's public root.
            return <Redirect to={PUBLIC_ROOT}/>;
        }
        else if (isPublic === true) {
            //If the route is public, the user may proceed.
            return <Route {...props} component={component}/>;
        }
    }
};

export default AuthRoute;