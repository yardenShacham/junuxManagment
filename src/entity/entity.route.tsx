import * as React from 'react';
import {Route, Switch} from "react-router"
import AuthRoute from '../core/authRoute';
import {Entity} from './entity.component';
import {NotFound} from '../common/notFound';

let entetiesRoutesArray: any = [];

export const route = (<AuthRoute path="/entities" component={Entity}/>);

export function addRoute(route: any) {
    entetiesRoutesArray.push(route);
}

export const entetiesRoutes = (
    <Switch>
        {entetiesRoutesArray}
        <Route path="*" render={(props) => <NotFound {...props} />}/>
    </Switch>);
