import * as React from 'react';
import AuthRoute from "../core/authRoute";
import {signUpPage} from './signUp.component';

export const route = <AuthRoute path="/login" component={signUpPage}/>
