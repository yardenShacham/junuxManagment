import * as React from "react";
import Draggable from 'react-draggable';
import {Resizer} from '../resizer';

export class Intractionable extends React.Component<any> {

    constructor() {
        super();
    }


    render() {
        const {onDrag,onResize,children} = this.props;
        return (
            <Draggable
                handle=".content"
                onDrag={onDrag}>
                <div className="intractionable">
                    <div className="content"> {children}</div>
                    <Resizer content=".content" direction="right" onResize={onResize}></Resizer>
                    <Resizer content=".content" direction="bottom" onResize={onResize}></Resizer>
                    <Resizer content=".content" direction="both" onResize={onResize}></Resizer>
                </div>
            </Draggable>

        );
    }
}