import * as React from 'react';
import AuthRoute from '../../core/authRoute';
import {EntityEditCreate} from './entity-edit-create.component'

export const route = <AuthRoute path="/entities/:id" component={EntityEditCreate}/>
