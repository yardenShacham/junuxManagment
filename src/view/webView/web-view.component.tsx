import * as React from "react";
import {inject, observer} from "mobx-react";
import {ViewContainer} from '../../common/view-container';
import {Intractionable} from '../../common/intractionable';


@inject('viewsStore') @observer
export class WebView extends React.Component<any> {
    state: any
    refs: any

    constructor() {
        super();
        this.state = {
            config: {
                gridSize: {
                    totalCoulmns: 15,
                    totalRows: 15
                },
                isIntractionable: false
            }
        }
    }

    componentDidMount() {

    }

    getCellCollisions = (e: any) => {
        let collisions = this.state.config.getCellCollisions(e.target);
    }

    render() {
        return (
            <div className="web-view-new">
                <h2>Create Web view</h2>
                <div className="wvn-content">
                    <ViewContainer config={this.state.config}/>
                    <div className="fields">
                      {/*  <Intractionable
                            onDrag={this.getCellCollisions}>
                            <button>Submit</button>
                        </Intractionable>*/}
                        <Intractionable
                            onDrag={this.getCellCollisions}
                            onResize={this.getCellCollisions}>
                            <input type="text"/>
                        </Intractionable>
                      {/*  <Intractionable
                            onDrag={this.getCellCollisions}>
                            <label>First Name</label>
                        </Intractionable>*/}
                    </div>
                </div>
            </div>);
    }
}