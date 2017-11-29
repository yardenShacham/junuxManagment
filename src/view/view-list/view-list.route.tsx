import * as React from 'react';
import AuthRoute from "../../core/authRoute";
import {ViewList} from './view-list.component';

export const route = <AuthRoute exact path="/views" component={ViewList}/>
