import * as React from 'react';
import {Route, Switch} from "react-router"
import AuthRoute from '../core/authRoute';
import {View} from './view.component';

let viewsRoutesArray: any = [];

export const route = (<AuthRoute path="/views" component={View}/>);

export function addRoute(route: any) {
    viewsRoutesArray.push(route);
}

export const viewsRoutes = (
    <Switch>
        {viewsRoutesArray}
    </Switch>);
