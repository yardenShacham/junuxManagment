import * as React from "react";
import {inject, observer} from "mobx-react";
import {DynamicTable} from '../../common/dynamic-table';
import {Link} from 'react-router-dom';

@observer
export class EntityList extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>EntityList</h2>
                <DynamicTable></DynamicTable>
            </div>);
    }
}