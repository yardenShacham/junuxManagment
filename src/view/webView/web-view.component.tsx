import * as React from "react";
import {inject, observer} from "mobx-react";
import {ViewContainer} from '../../common/view-container';
import Draggable from 'react-draggable';

@inject('viewsStore') @observer
export class WebView extends React.Component<any> {
    state: any
    refs: any

    constructor() {
        super();
        this.state = {
            config: {
                gridSize: {
                    totalCoulmns: 50,
                    totalRows: 50
                },
                isIntractionable: false
            }
        }
    }

    componentDidMount() {

    }

    getCellCollisions = (e: any) => {
        this.state.config.getCellCollisions(e.target);
    }

    render() {
        return (
            <div className="web-view-new">
                <h2>Create Web view</h2>
                <div className="wvn-content">
                    <ViewContainer config={this.state.config}/>
                    <div className="fields">
                        <Draggable
                            onDrag={this.getCellCollisions}>
                            <div className="dd"></div>
                        </Draggable>
                    </div>
                </div>
            </div>);
    }
}