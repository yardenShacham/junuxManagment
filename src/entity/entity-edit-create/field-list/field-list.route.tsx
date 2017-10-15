import * as React from 'react';
import {Route} from "react-router";
import {FieldList} from './field-list.component'

export const route = <Route  path="/entities/:id/fields" render={(props) => <FieldList {...props} />}/>
