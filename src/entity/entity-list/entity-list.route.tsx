import * as React from 'react';
import {Route} from "react-router";
import {EntityList} from './entity-list.component';

export const route = <Route exact path="/entities" render={(props) => <EntityList {...props} />}/>
