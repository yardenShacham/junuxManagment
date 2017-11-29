import * as React from "react";
import {ViewConfiguration} from './view-configuration';
import {appInjector} from '../../core/appInjector';
import Draggable from 'react-draggable';

export class ViewContainer extends React.Component<any> {

    state: any
    props: any

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.config.getCellCollisions = this.getCellCollisions;
        this.setGridStyles(this.props.config.gridSize.totalCoulmns);
    }

    buildGrid(gridSize: any) {
        let cells: any[] = [];
        for (let i = 0; i < gridSize.totalRows; i++) {

            for (let j = 0; j < gridSize.totalCoulmns; j++) {
                cells.push(
                    <div key={`[${i},${j}]`} id={`[${i},${j}]`} className="cell"></div>
                )
            }
        }
        return cells;
    }

    setGridStyles(totalCoulmns: number) {
        if (totalCoulmns && this.refs.vcNode) {
            appInjector.get("styleService")
                .setElementStyleListener(this.refs.vcNode, 'colNum',
                    () => totalCoulmns);

            let pren = 100 / totalCoulmns + '%';
            appInjector.get("styleService")
                .setElementStyleListener(this.refs.vcNode, 'colPren',
                    () => pren);

        }
    }

    setGrid(config: ViewConfiguration) {
        if (config && config.gridSize) {
            this.setGridStyles(config.gridSize.totalCoulmns);
            return this.buildGrid(config.gridSize);
        }
    }

    getCellCollisions(dragedObj: any) {
        debugger
        //calc
        return ["3,4", "1,2"];
    }

    render() {
        let {config} = this.props;

        return (
            <Draggable
                handle=".glyphicon-move">
                <div ref="vcNode" className={`view-container ${config.isIntractionable ? 'intractionable' : ''}`}>
                    {this.setGrid(config)}
                    {config.isIntractionable ?
                        <span className="glyphicon glyphicon-move"></span> : null
                    }
                </div>
            </Draggable>
        );
    }
}