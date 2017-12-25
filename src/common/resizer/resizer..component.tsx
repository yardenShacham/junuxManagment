import * as React from "react";

export class Resizer extends React.Component<any> {
    lisener: any;
    refs: any;
    contentElementNode: any;
    startX;
    startY;
    startWidth;
    startHeight


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getContent, direction} = this.props;
        this.contentElementNode = getContent();
        if (this.contentElementNode) {

            this.lisener = this.refs.resizer
                .addEventListener("mousedown", this.initDrag, null);
        }
    }

    initDrag = (e: any) => {
        if (this.props.direction === "bottom") {
            this.startY = e.clientY;
            this.startHeight = parseInt(document.defaultView.getComputedStyle(this.contentElementNode).height, 10);
        }
        else if (this.props.direction === "both") {
            this.startY = e.clientY;
            this.startHeight = parseInt(document.defaultView.getComputedStyle(this.contentElementNode).height, 10);
            this.startX = e.clientX;
            this.startWidth = parseInt(document.defaultView.getComputedStyle(this.contentElementNode).width, 10);
        }
        else {
            this.startX = e.clientX;
            this.startWidth = parseInt(document.defaultView.getComputedStyle(this.contentElementNode).width, 10);

        }
        document.documentElement.addEventListener('mousemove', this.doDrag, false);
        document.documentElement.addEventListener('mouseup', this.stopDrag, false);
    }

    doDrag = (e: any) => {
        if (this.props.direction === "bottom") {
            const pixlesHight = this.getPixles((this.startHeight + e.clientY - this.startY));
            this.contentElementNode.style.height = pixlesHight;

        }
        else if (this.props.direction === "both") {
            const pixlesHight = this.getPixles((this.startHeight + e.clientY - this.startY));
            this.contentElementNode.style.height = pixlesHight;
            const pixleWidth = this.getPixles((this.startWidth + e.clientX - this.startX));
            this.contentElementNode.style.width = pixleWidth;
        }
        else if (this.props.direction === "right") {
            const pixleWidth = this.getPixles((this.startWidth + e.clientX - this.startX));
            this.contentElementNode.style.width = pixleWidth;
        }
        if (this.props.onResize)
            this.props.onResize({target: this.contentElementNode});
    }

    stopDrag = (e: any) => {
        document.documentElement.removeEventListener('mousemove', this.doDrag, false);
        document.documentElement.removeEventListener('mouseup', this.stopDrag, false);
    }

    componentWillUnmount() {
        this.refs.resizer
            .removeEventListener("onmousedown", this.lisener);
    }


    getPixles(totalPixles: number) {
        return `${totalPixles}px`;
    }

    render() {
        const {direction} = this.props;
        return (
            <span ref="resizer" className={`resizer ${direction}`}></span>
        );
    }
}