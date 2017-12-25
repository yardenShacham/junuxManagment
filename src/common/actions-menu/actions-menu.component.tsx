import * as React from 'react'

export class ActionsMenu extends React.Component<any> {
    state: any
    isLisActive: boolean
    selectedSvg =
        <svg className="selected"
             width="67" height="72" viewBox="0 0 67 72">
            <defs>
                <filter id="leftBarButtonEarTopFilter" width="200%" height="200%" x="-50%" y="-50%"
                        filterUnits="objectBoundingBox">
                    <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.581">
                    </feGaussianBlur>
                    <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1"
                                   values="0 0 0 0 0.0862745098 0 0 0 0 0.176470588 0 0 0 0 0.239215686 0 0 0 0.266 0">
                    </feColorMatrix>
                    <feMerge>
                        <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>
            <path fill="#f8a239"
                  d="M27.856 4C14.666 4.103 4 14.759 4 27.936 4 41.174 14.76 52.03 28.031 52.03c-3.673 0 13.314-.05 13.314-.05 9.058.474 19.9 3.464 21.653 19.022l-.023-66.989L27.856 4z"
                  filter="url(#leftBarButtonEarTopFilter)">
            </path>
        </svg>

    constructor(props) {
        super(props);
        this.isLisActive = true;
        this.state = {
            actions: []
        }
    }

    componentDidMount() {
        const {actions} = this.props;
        this.setState({
            actions: actions
        });
    }

    active(action: any) {
        action.isActive = true;
        this.isLisActive = false;
        this.setState({
            actions: this.state.actions
        });
    }

    unActive(e: any, action: any) {
        e.stopPropagation();
        action.isActive = false;
        this.isLisActive = true;
        this.setState({
            actions: this.state.actions
        });
    }


    render() {
        const actions = this.state.actions.map((action: any, i: number) => {
            return (
                <li className={`${this.isLisActive ? 'active' : ''}
                ${action.isActive ? 'selected-action' : ''}`} key={i}>
                    {action.isActive ? this.selectedSvg : null}
                    <div onClick={this.active.bind(this, action)} style={action.style} className="action-container">
                        {action.svgElement}
                        <div className="action-name">{action.name}</div>
                        {<div className={`popup ${action.isActive ? 'active' : ''}`}>
                            <div className="popup-header">
                                <span>{action.name}</span>
                                <div onClick={(e) => this.unActive(e, action)} className="close-btn">
                                    <svg width="25" height="25" viewBox="0 0 25 25">
                                        <path
                                            d="M11.793 12.5L8.146 8.854 7.793 8.5l.707-.707.354.353 3.646 3.647 3.646-3.647.354-.353.707.707-.353.354-3.647 3.646 3.647 3.646.353.354-.707.707-.354-.353-3.646-3.647-3.646 3.647-.354.353-.707-.707.353-.354 3.647-3.646z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="popup-content">
                                {action.popupHtmlContent}
                            </div>
                        </div>}
                    </div>
                </li>
            );
        });

        return (
            <div className="action-menu-container">
                <ul>{actions}</ul>
            </div>
        )
    }
}