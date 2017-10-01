import * as React from "react";
import {inject, observer} from "mobx-react";
import {DynamicTable} from '../../common/dynamic-table';
import {Link} from 'react-router-dom';

@observer
export class EntityList extends React.Component<any> {


    componentDidMount() {
    }

    render() {
        let data = [{
            lastName: "shacham",
            phoneNumber1: "0524806473",
            phoneNumber2: "0524806473",
            phoneNumber3: "0524806473"
        }, {
            firstName: "yarden",
            lastName: "shacham",
            phoneNumber: "0524806473",
            phoneNumber1: "0524806473",
            phoneNumber2: "0524806473",
            phoneNumber3: "0524806473"
        }, {
            phoneNumber: "0524806473",
            phoneNumber1: "0524806473",
            firstName: "yarden",
            lastName: "shacham",
            phoneNumber3: "0524806473"
        }];
        return (
            <div>
                <h2>EntityList</h2>
                <DynamicTable data={data}></DynamicTable>
            </div>);
    }
}