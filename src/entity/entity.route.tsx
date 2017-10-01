import * as React from 'react';
import {Route, Switch} from "react-router"
import {Entity} from './entity.component';
import {NotFound} from '../common/notFound';

let entetiesRoutesArray: any = [];

export const route = (<Route path="/entities" render={(props) => <Entity {...props} />}/>);

export function addRoute(route: any) {
    entetiesRoutesArray.push(route);
}

export const entetiesRoutes = (
    <Switch>
        {entetiesRoutesArray}
        <Route path="*" render={(props) => <NotFound {...props} />}/>
    </Switch>);
