import * as React from "react";
import {inject, observer} from "mobx-react";

@inject() @observer
export class FieldList extends React.Component<any> {

    componentWillMount() {

    }

    render() {
        return (
            <div>
                field list
            </div>);
    }
}