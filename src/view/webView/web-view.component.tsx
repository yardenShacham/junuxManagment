import * as React from "react";
import {inject, observer} from "mobx-react";
import {ViewContainer} from '../../common/view-container';
import {Intractionable} from '../../common/intractionable';
import {ACTION_CONFIG} from './actionMenu-config';
import {ActionsMenu} from '../../common/actions-menu';


@inject('viewsStore') @observer
export class WebView extends React.Component<any> {
    state: any
    refs: any

    constructor(props) {
        super(props);
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
        if (this.props.match.params.id)
            this.props.viewsStore.getViewById(this.props.match.params.id);

        document.body.classList.add('emtpty-background');
    }

    componentWillUnmount() {
        document.body.classList.remove('emtpty-background');
    }

    getCellCollisions = (e: any) => {
        let collisions = this.state.config.getCellCollisions(e.target);
    }

    render() {
        return (
            <div className="web-view-new">
                <div className="wvn-content">
                    <ViewContainer config={this.state.config}/>
                    <div className="page-content">
                        <ActionsMenu actions={ACTION_CONFIG}/>
                        {/* <Intractionable
                            onDrag={this.getCellCollisions}
                            onResize={this.getCellCollisions}>
                            <div style={{backgroundColor: 'red', width: '100px', height: '100px'}}></div>
                        </Intractionable>*/}

                    </div>
                </div>
            </div>);
    }
}