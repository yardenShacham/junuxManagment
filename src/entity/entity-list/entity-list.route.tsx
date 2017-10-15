import * as React from 'react';
import AuthRoute from '../../core/authRoute';
import {EntityList} from './entity-list.component';

export const route = <AuthRoute exact path="/entities" component={EntityList}/>
