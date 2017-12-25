import * as React from "react";
import {
    startCase,
    forEach,
    findIndex,
    isFunction,
    isString,
    orderBy
} from 'lodash';
import {Jsx} from '../../app.types';
import {TableStyles, Options, Configurations} from './configuration';
import {dynamicTableService} from './dynamic-table-service'
import {appInjector} from '../../core/appInjector';


export class DynamicTable extends React.Component<any> {
    keys: string[] = [];
    props: any
    dService: dynamicTableService

    constructor(props) {
        super(props);
        this.dService = new dynamicTableService();
    }

    componentWillMount() {
        this.keys = this.dService.getKeys(this.props.data)
    }

    getHeader(data: any): Jsx[] {

        let coulmns: Jsx[] = [];
        for (let i = 0; i < this.keys.length; i++) {
            coulmns.push((<div key={i} className="cell">{startCase(this.keys[i])}</div>));
        }
        return coulmns;
    }

    getHeaderByOptions(data: any, options: Options[]) {
        let headerCoulmns: any[] = [];
        let i = 0;
        forEach(options, (o: Options) => {
            let coulmn = this.getHeaderByOption(data, o, i);
            headerCoulmns.push(coulmn);
            i++;
        });

        return orderBy(headerCoulmns, ["order"], "asc").map((item: any) => item.html);
    }

    getSortUnit(sortBy: any) {
        let sortUnit = <span onClick={this.sort.bind(this,sortBy)} className="glyphicon glyphicon-sort"></span>
        return sortUnit;
    }

    getHeaderByOption(data: any, options: Options, headerNumber: number) {
        let header: any;
        if (isString(options.header)) {
            header = (sortUnit: any) => {
                return (
                    <div key={headerNumber} className={`cell ${sortUnit ? 'with-sort' : ''}`}>
                        <span>{options.header}</span>
                        {sortUnit}
                    </div>
                )
            };
        }
        else if (isFunction(options.header)) {
            let label = options.header(data);
            header = (sortUnit: any) => {
                return (
                    <div key={headerNumber} className={`cell ${sortUnit ? 'with-sort' : ''}`}>
                        <span>{label}</span>
                        {sortUnit}
                    </div>
                )
            };
        }

        return {
            html: options.sort ? header(this.getSortUnit(options.sort.sortBy)) : header(),
            order: options.order ? options.order : headerNumber
        };
    }

    getTableContent(data: any[]): Jsx[] {
        let rows: Jsx[] = [];
        forEach(data, (row: any, i: number) => {
            let cells = this.setRowContent(row, i);
            rows = rows.concat(cells);
        });
        return rows;
    }

    sort(getBy: any) {
        this.props.data = orderBy(this.props.data, getBy, ["asc"]);
    }

    getTableContentByOptions(data: any, options: Options[]) {
        let cells: Jsx[] = [];
        forEach(data, (item: any, i: number) => {
            let row = this.setRowContentByOptions(item, i, options);
            cells = cells.concat(row);
        });
        return cells;
    }

    setStyles(styles: TableStyles) {

        let setSpesificStyle = (propName: string, style: any) => {
            if (style)
                appInjector.get("styleService")
                    .setStyleListener(`--${propName}`, () => style);
        };

        if (styles) {
            if (styles.header) {
                setSpesificStyle("headerBackgroundColor", styles.header.backgroundColor);
                setSpesificStyle("headerOpacity", styles.header.opacity);
                setSpesificStyle("headerColor", styles.header.color);
                setSpesificStyle("headerFontSize", styles.header.fontSize);
                setSpesificStyle("headerBorder", styles.header.border);
                setSpesificStyle("cornersRadius", styles.header.cornersRadius);
                setSpesificStyle("headerMinHeight", styles.header.minHeight);
                setSpesificStyle("headerTextAlign", styles.header.textAlign);
            }
            if (styles.content) {
                setSpesificStyle("borderSidesRull", styles.content.borderSidesRull);
                if (styles.content.cell) {
                    setSpesificStyle("color", styles.content.cell.color);
                    setSpesificStyle("fontSize", styles.content.cell.fontSize);
                    setSpesificStyle("backgroundColor", styles.content.cell.backgroundColor);
                    setSpesificStyle("opacity", styles.content.cell.opacity);
                    setSpesificStyle("minHeight", styles.content.cell.minHeight);
                    setSpesificStyle("cellBorderBottom", styles.content.cell.borderBottom);
                    setSpesificStyle("cellBorderLeft", styles.content.cell.borderLeft);
                    setSpesificStyle("cellBorderRight", styles.content.cell.borderRight);
                    setSpesificStyle("cellTextAlign", styles.content.cell.textAlign);
                    setSpesificStyle("cellMargin", styles.content.cell.cellMargin);
                }
            }
        }
    }

    setRowContent = (rowData: any, rowNumber: number): Jsx[] => {
        let cells: Jsx[] = [];
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

    setRowContentByOptions(rowData: any, rowNumber: number, options: Options[]) {
        let rowCells: Jsx[] = [];
        forEach(options, (o: Options, i: number) => {
            if (o.content) {
                if (isFunction(o.content.getValue)) {
                    let val = o.content.getValue(rowData);
                    if (val) {
                        rowCells
                            .push(<div key={`${rowNumber}${i}`} className="cell">{val}</div>);
                    }
                    else
                        rowCells.push(<div key={`${rowNumber}${i}`} className="cell"></div>);
                }
                else {
                    if (isFunction(o.content.displayValue)) {
                        let displayValue = o.content.displayValue(rowData);
                        rowCells
                            .push(<div key={`${rowNumber}${i}`} className="cell">{displayValue}</div>);
                    }
                }
            }
        });
        return rowCells;
    }

    render() {
        const {data} = this.props;
        let configurations: Configurations = this.props.configurations;

        if (configurations) {
            this.setStyles(configurations.styles);
        }
        let headerCoulmns: any = configurations.options &&
        findIndex(configurations.options, (o: Options) => o.header ? true : false) !== -1 ?
            this.getHeaderByOptions(data, configurations.options) :
            this.getHeader(data);

        let cells: any = configurations.options &&
        findIndex(configurations.options, (o: Options) => o.content ? true : false) !== -1 ?
            this.getTableContentByOptions(data, configurations.options) :
            this.getTableContent(data);
        if (data) {
            appInjector.get("styleService")
                .setStyleListener("--colNum", () => headerCoulmns.length);
        }
        return (
            <div className="dynamic-table">
                <div className="header">
                    {headerCoulmns}
                </div>
                <div className="content">
                    {cells}
                </div>
            </div>);

    }
}