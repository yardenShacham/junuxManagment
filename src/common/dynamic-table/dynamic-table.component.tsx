import * as React from "react";
import {camelCase, forEach} from 'lodash'
import {appInjector} from '../../core/appInjector';


export class DynamicTable extends React.Component<any> {

    componentDidMount() {

    }


    getHeader(data: any): any[] {
        let keys = Object.keys(data);
        let coulmns: any[] = [];
        for (let i = 0; i < keys.length; i++) {
            coulmns.push((<div key={i} className="cell">{camelCase(keys[i])}</div>));
        }
        return coulmns;
    }

    getTableContent(data: any) {
        let rows: any[] = [];
        forEach(data, (row) => {
            rows.concat(this.setRowContent(row));
        });
        return rows;
    }

    setRowContent(rowData: any) {
        let keys = Object.keys(rowData);
        let startFrom = keys.length;
        let coulmns: any[] = [];
        for (let i = 0; i < keys.length; i++) {
            coulmns.push((<div key={startFrom + i} className="cell">{rowData[keys[i]]}</div>));
        }
        return coulmns;
    }

    render() {
        const data = [{
            firstName: "yarden",
            lastName: "shacham",
            phoneNumber: "0524806473",
            phoneNumber1: "0524806473",
            phoneNumber2: "0524806473",
            phoneNumber3: "0524806473"
        },{
            firstName: "yarden",
            lastName: "shacham",
            phoneNumber: "0524806473",
            phoneNumber1: "0524806473",
            phoneNumber2: "0524806473",
            phoneNumber3: "0524806473"
        }];
        const configuration = {
            header: {
                backgroundColor: "green",
                color: "white",
                fontSize: "20px"
            },
            content: {
                backgroundColor: "yellow",
                color: "black",
                fontSize: "20px"
            }
        }
        appInjector.get("styleService")
            .setStyleListener("--colNum", () => Object.keys(data).length);
        return (
            <div className="dynamic-table">
                <div className="header">
                    {this.getHeader(data)}
                </div>
                <div className="content">
                    {this.getTableContent(data)}
                </div>
            </div>);
    }
}