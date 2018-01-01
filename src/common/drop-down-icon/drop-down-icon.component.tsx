import * as React from "react";

export class DropDownIcon extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        const {iconName, items} = this.props;
        return (
            <div className="dropdown">
                <span style={{cursor: 'pointer'}}
                      aria-expanded="true"
                      data-toggle="dropdown" aria-haspopup="true"
                      className={`glyphicon glyphicon-${iconName} dropdown-toggle`}></span>
                <ul className="dropdown-menu">
                    {
                        items.map((item: any) =>
                            <li><a onClick={item.action}>{item.label}</a></li>)
                    }
                </ul>
            </div>);
    }
}