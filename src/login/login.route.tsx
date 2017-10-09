import * as React from 'react';
import AuthRoute from "../core/authRoute";
import {LoginPage} from './login-page.component';

export const route = <AuthRoute path="/login" component={LoginPage}/>
