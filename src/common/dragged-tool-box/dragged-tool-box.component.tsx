import * as React from "react";
import Draggable from 'react-draggable';
import {isFunction} from 'lodash';

export class DraggedToolBox extends React.Component<any> {

    componentDidMount() {
    }

    prefix = "drtbx";

    onDrop = (e, data) => {
        const {tools, getId, onDateDrop} = this.props;
        let id = data.node.id.replace(this.prefix, '');
        let foundTool = tools.find((tool: any) => getId ? getId(tool) : tool.id == id);
        if (onDateDrop) {
            onDateDrop(foundTool);
        }
    }


    generateToolItems(tools: any[], getId?: any) {
        return tools.map((tool: any, i: number) => {
            let id = getId ? getId(tool) : tool.id;
            if (id) {
                return ( <Draggable
                    key={i}
                    handle=".tool-item"
                    onStop={this.onDrop}>
                    <div id={`${this.prefix}${id}`} className="tool-item">{tool.html}</div>
                </Draggable>);
            }
            else
                console.error('tool dont have an id or getId');
        });
    }

    render() {
        const {tools} = this.props;
        return (
            <div className="tool-box-container">
                {this.generateToolItems(tools)}
            </div>);
    }
}