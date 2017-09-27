import * as React from 'react';
import {Route, Redirect, Switch} from "react-router"
import {NotFound} from "./common/notFound";

let routesArray: any = [];

export function addRoute(route: any) {
    routesArray.push(route);
}

export const Routes =
    (<Switch>
        {routesArray}
        <Route path="*" render={(props) => <NotFound {...props} />}/>
    </Switch>);