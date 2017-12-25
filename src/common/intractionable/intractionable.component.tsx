import * as React from "react";
import Draggable from 'react-draggable';
import {Resizer} from '../resizer';

export class Intractionable extends React.Component<any> {

    props: any
    refs: any;
    isEditMode: boolean;
    isMouseInside: boolean
    state: any

    constructor(props) {
        super(props);
    }


    syncMaskSize = (e: any) => {
        if (this.refs.content) {
            let rectContent = this.refs.content.getBoundingClientRect();
            this.refs.mask.style.width = `${rectContent.width}px`;
            this.refs.mask.style.height = `${rectContent.height}px`;
            if (e)
                this.props.onResize(e);
        }
    }

    setMouseMode(isMouseInside: boolean) {
        this.isMouseInside = isMouseInside;
    }

    moveEditMode() {
        this.isEditMode = true;
        this.refs.container.classList.add('edit-mode');
        this.refs.mask.classList.replace('intractionable-mask-view', 'intractionable-mask');
        this.refs.mask.addEventListener('keyup', this.tryRemove, true);
    }

    moveViewMode() {
        this.refs.container.classList.remove('edit-mode');
        this.refs.mask.classList.replace('intractionable-mask', 'intractionable-mask-view');
        this.isEditMode = false;
        this.refs.mask.removeEventListener('keyup', this.tryRemove, false);
    }

    changeMode = () => {
        if (this.isEditMode && !this.isMouseInside) {
            this.moveViewMode();
        }
        else {
            if (this.isMouseInside) {
                this.moveEditMode();
            }
        }
    }

    setDefaultContentSize() {
        if (this.props.children.props && this.props.children.props.style) {
            if (this.props.children.props.style.width) {
                this.refs.content.style.width = this.props.children.props.style.width;
            }
            if (this.props.children.props.style.height) {
                this.refs.content.style.height = this.props.children.props.style.height;
            }
        }
    }

    tryRemove = (e: any) => {
        if (e.keyCode === 46 && this.props.onRemove) {
            this.props.onRemove(e);
        }
    }

    componentDidMount() {
        this.setDefaultContentSize();
        this.syncMaskSize(null);
        this.isEditMode = true;
        document.addEventListener('click', this.changeMode, null);
    }

    render() {
        const {onDrag, children} = this.props;
        return (
            <Draggable
                handle=".intractionable-mask"
                onDrag={onDrag}>
                <div
                    onMouseEnter={this.setMouseMode.bind(this, true)}
                    onMouseLeave={this.setMouseMode.bind(this, false)}
                    onClick={this.moveEditMode.bind(this)}
                    className="intractionable edit-mode"
                    ref="container">
                    <div ref="content" className="content">
                        {children}
                    </div>
                    <div ref="mask" tabIndex={-1} className="intractionable-mask"></div>
                    <Resizer getContent={() => this.refs.content}
                             direction="right"
                             onResize={this.syncMaskSize}>
                    </Resizer>
                    <Resizer getContent={() => this.refs.content}
                             direction="bottom"
                             onResize={this.syncMaskSize}>
                    </Resizer>
                    <Resizer getContent={() => this.refs.content}
                             direction="both"
                             onResize={this.syncMaskSize}>
                    </Resizer>
                </div>
            </Draggable>
        );
    }
}