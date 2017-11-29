import * as React from "react";
import {inject, observer} from "mobx-react";
import {viewsRoutes} from './view.route';
import {BtnInput} from '../common/btn-input';

@inject('viewsStore') @observer
export class View extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        return (
            <div className="views-container">
                {viewsRoutes}
            </div>);
    }
}