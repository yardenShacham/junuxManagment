import * as React from "react";
import {startCase, forEach, uniq} from 'lodash';
import {dynamicTableService} from './dynamic-table-service'
import {appInjector} from '../../core/appInjector';


export class DynamicTable extends React.Component<any> {
    keys: string[] = [];
    props: any
    dService: dynamicTableService

    constructor() {
        super();
        this.dService = new dynamicTableService();
    }

    componentWillMount() {
        this.keys = this.dService.getKeys(this.props.data)
    }


    getHeader(data: any): any[] {
        let coulmns: any[] = [];
        for (let i = 0; i < this.keys.length; i++) {
            coulmns.push((<div key={i} className="cell">{startCase(this.keys[i])}</div>));
        }
        return coulmns;
    }

    getTableContent(data: any[]) {
        let rows: any[] = [];
        forEach(data, (row: any, i: number) => {
            let cells = this.setRowContent(row, i);
            rows = rows.concat(cells);
        });
        return rows;
    }

    setRowContent = (rowData: any, rowNumber: number) => {
        let cells: any[] = [];
        forEach(this.keys, (key: string, i: number) => {
            let val = rowData[key];
            if (val) {
                cells.push(<div key={`${rowNumber}${i}`} className="cell">{val}</div>);
            }
            else {
                cells.push(<div key={`${rowNumber}${i}`} className="cell"></div>);
            }
        });

        return cells;
    }

    render() {
        const {data} = this.props;
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
        if (data) {
            appInjector.get("styleService")
                .setStyleListener("--colNum", () => this.keys.length);
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
}