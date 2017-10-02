import * as React from "react";
import {inject, observer} from "mobx-react";
import {DynamicTable, Configurations} from '../../common/dynamic-table';
import {Link} from 'react-router-dom';
import {MessageIcon} from '../../common/show-message-icon';

@observer
export class EntityList extends React.Component<any> {


    componentDidMount() {
    }

    render() {
        let data = [{
            myLove: "sivan",
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
            options: [{
                header: (val) => "First Name",
                content: {
                    getValue: (val: any) => val.firstName
                }
            }, {
                order: 4,
                header: (val) => "Test 1",
                content: {
                    getValue: (val: any) => val.lastName
                }
            }, {
                order: 3,
                header: (val) => "Test 2",
                content: {
                    getValue: (val: any) => val.lastName
                }
            }, {
                order: 2,
                header: (val) => "Test 3",
                content: {
                    getValue: (val: any) => val.lastName
                }
            }, {
                order: 1,
                header: (val) => "Test 4",
                content: {
                    getValue: (val: any) => val.lastName
                }
            }, {
                header: (val) => "",
                content: {
                    displayValue: (val: any) =>
                        (<MessageIcon message={val.phoneNumber}></MessageIcon>)
                }
            }],
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
                        backgroundColor: "purple",
                        opacity: "",
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