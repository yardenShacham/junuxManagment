import * as React from 'react';
import {Route} from "react-router";
import {Dashboard} from './dashboard.component';

export const route = <Route path="/home" render={(props) => <Dashboard {...props} />}/>
