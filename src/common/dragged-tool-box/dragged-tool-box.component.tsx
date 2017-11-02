import * as React from "react";
import Draggable from 'react-draggable';
import {cloneDeep, reject, forEach} from 'lodash';
import {appInjector} from '../../core/appInjector';

export class DraggedToolBox extends React.Component<any> {
    dropZoneRectInfo: any[]
    mosueLocation: any
    state: any
    startDraggedPosition: any

    constructor(props: any) {
        super(props);
        this.state = {
            draggedPosition: {
                x: 0,
                y: 0
            }
        }
    }

    componentDidMount() {
        document.body.onmousemove = (e: any) => {
            this.mosueLocation = {
                top: e.clientY,
                left: e.clientX
            }
        };

        this.setStyles(this.props.styles);
    }

    setStyles(styles: any) {
        if (styles) {
            forEach(styles, (val: any, key: string) => {
                appInjector.get("styleService")
                    .setStyleListener(`--${key}`, () => val);
            });
        }
    }

    isBetween(dropZonePosition: any) {
        let isBetweenX = this.mosueLocation.left >= dropZonePosition.rectInfo.left
            && this.mosueLocation.left <= (dropZonePosition.rectInfo.left + dropZonePosition.rectInfo.width);
        let isBetweenY = this.mosueLocation.top >= dropZonePosition.rectInfo.top
            && this.mosueLocation.top <= (dropZonePosition.rectInfo.top + dropZonePosition.rectInfo.height);

        return isBetweenX && isBetweenY;
    }

    isDropZoneActive() {
        for (let i = 0; i < this.dropZoneRectInfo.length; i++) {
            if (this.isBetween(this.dropZoneRectInfo[i])) {
                return this.dropZoneRectInfo[i].element;
            }
        }
        return null;
    }

    onStop = (e: any, data: any) => {
        const {clearAfterDroped, onToolDroped} = this.props;
        this.dropZoneRectInfo = this.getDropzonesRectInfo();
        let isDropZoneActive = this.isDropZoneActive();
        if (isDropZoneActive) {
            let tool = JSON.parse(data.node.id)
            onToolDroped(tool, isDropZoneActive);
            if (clearAfterDroped) {
                data.node.remove();
            }
        }
        appInjector.get("styleService")
            .setStyleListener("--overflowY", () => "scroll");
    }

    onStart = (e: any, data: any) => {
        this.startDraggedPosition = {
            x: data.x,
            y: data.y
        }
        appInjector.get("styleService")
            .setStyleListener("--overflowY", () => "visible");
    }

    getDropzonesRectInfo() {
        let dropZonePositions = [];
        let dropZones = document.getElementsByClassName('drop-zone');
        for (let i = 0; i < dropZones.length; i++) {
            let rectInfo: any = dropZones[i].getBoundingClientRect();
            dropZonePositions.push({
                element: dropZones[i],
                rectInfo
            });
        }
        return dropZonePositions;
    }


    generateToolItems(tools: any[], getId?: any) {
        if (tools) {
            return tools.map((tool: any, i: number) => {
                let id = getId ? getId(tool) : tool.id;
                if (id) {
                    let copyTool = cloneDeep(tool);
                    delete copyTool.html;
                    return (
                        <Draggable
                            key={i}
                            handle={tool.handle}
                            position={this.state.draggedPosition}
                            onStart={this.onStart}
                            onStop={this.onStop}>
                            <div id={JSON.stringify(copyTool)} style={tool.styles} className="tool-item">
                                <div onClick={() => this.props.removeToolItem(tool)} className="remove-box">
                                    <span className="glyphicon glyphicon-remove"></span>
                                </div>
                                {tool.html}
                            </div>
                        </Draggable>
                    );
                }
                else
                    console.error('tool dont have an id or getId');
            });
        }
    }

    render() {
        const {tools, getId} = this.props;
        return (
            <div className="tool-box-container">
                {this.generateToolItems(tools, getId)}
            </div>);
    }
}