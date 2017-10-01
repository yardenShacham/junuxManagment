import * as React from "react";
import {entetiesRoutes} from './entity.route';
import {inject, observer} from "mobx-react";

@inject('appStore') @observer
export class Entity extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Entity global component</h1>
                {entetiesRoutes}
            </div>);
    }
}