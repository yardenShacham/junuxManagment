import * as React from "react";

const encryptor = require('simple-encryptor')("mKeymKeymKeymKey");
import {ViewConfiguration} from './view-configuration';
import {appInjector} from '../../core/appInjector';
import Draggable from 'react-draggable';

export class ViewContainer extends React.Component<any> {

    state: any
    refs: any
    props: any

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.config.getCellCollisions = this.getCellCollisions.bind(this);
        this.setGridStyles(this.props.config.gridSize.totalCoulmns);
    }

    buildGrid(gridSize: any) {
        let cells: any[] = [];
        for (let i = 0; i < gridSize.totalRows; i++) {

            for (let j = 0; j < gridSize.totalCoulmns; j++) {
                let key = `[${i},${j}]`;
                let en = encryptor.encrypt(key);
                cells.push(
                    <div key={key} id={en} className="cell"></div>
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

    getCellCollisions = (dragedObj: any) => {
        let cellCollisions = [];
        let draggedRect = dragedObj.getBoundingClientRect();
        let cells = this.refs.vcNode.children;
        for (let i = 0; i < cells.length; i++) {
            let cellRect = cells[i].getBoundingClientRect();
            let isCollied = this.isCellCollide(cellRect, draggedRect);
            if (isCollied) {
                cellCollisions.push(cells[i].id);
                cells[i].classList.add("collided");
            }
            else {
                cells[i].classList.remove("collided");
            }
        }

        return cellCollisions;
    }

    isCellCollide(cellRect: any, draggedRect: any) {
        if (cellRect.x < draggedRect.x + draggedRect.width &&
            cellRect.x + cellRect.width > draggedRect.x &&
            cellRect.y < draggedRect.y + draggedRect.height &&
            cellRect.height + cellRect.y > draggedRect.y) {
            return true;
        }

        return false;
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