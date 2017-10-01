import * as React from "react";
import {inject, observer} from "mobx-react";

@inject() @observer
export class EntityEditCreate extends React.Component<any> {

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <h1>{this.props.match.params.id}</h1>
            </div>);
    }
}