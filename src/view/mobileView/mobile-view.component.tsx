import * as React from "react";
import {inject, observer} from "mobx-react";

@inject('viewsStore') @observer
export class MobileView extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                Create Mobile view
            </div>);
    }
}