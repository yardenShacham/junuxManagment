import * as React from "react";
import {inject, observer} from "mobx-react";
import {DynamicTable, Configurations} from '../../common/dynamic-table';
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
            options: [],
            styles: {
                header: {
                    backgroundColor: "#66D4AF",
                    color: "white",
                    fontSize: "20px",
                    border: "",
                    cornersRadius: "",
                    minHeight: ""
                },
                content: {
                    borderSidesRull: "0.5px solid #66D4AF",
                    cell: {
                        backgroundColor: "transparent",
                        color: "white",
                        fontSize: "20px",
                        minHeight: "",
                        borderBottom: "",
                        borderLeft: "",
                        borderRight: ""
                    }
                }
            }
        }
        return (
            <div>
                <h2>EntityList</h2>
                <DynamicTable data={data} configurations={configurations}></DynamicTable>
            </div>);
    }
}