import * as React from "react";
import {inject, observer} from "mobx-react";
import {DynamicTable, Configurations} from '../../common/dynamic-table';
import {Link} from 'react-router-dom';
import {MessageIcon} from '../../common/show-message-icon';

@inject('entityStore') @observer
export class EntityList extends React.Component<any> {

    componentWillMount() {
        this.props.entityStore.getEntities();
    }

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
            phoneNumber: "0524806473  0524806473 0524806473 0524806473 0524806473 ",
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
        let configurations: Configurations = {

            styles: {
                header: {
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "15px",
                    border: "",
                    cornersRadius: "",
                    minHeight: "40px"
                },
                content: {
                    borderSidesRull: "0.5px solid black",
                    cell: {
                        backgroundColor: "transparent",
                        opacity: "",
                        color: "black",
                        fontSize: "15px",
                        minHeight: "",
                        borderBottom: "0.5px solid black",
                        borderLeft: "",
                        borderRight: ""
                    }
                }
            }
        }
        return (
            <div>
                <h2>EntityList</h2>
                {this.props.entityStore.entities}
                <DynamicTable data={data} configurations={configurations}></DynamicTable>
            </div>);
    }
}