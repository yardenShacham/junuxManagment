import * as React from 'react';
import {Route} from "react-router";
import {EntityEditCreate} from './entity-edit-create.component'

export const route = <Route  path="/entities/:id" render={(props) => <EntityEditCreate {...props} />}/>
