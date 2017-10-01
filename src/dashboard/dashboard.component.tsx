import * as React from "react";
import {inject, observer} from "mobx-react";

@observer
export class Dashboard extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>dashboard</h1>
            </div>);
    }
}