import * as React from "react";
import {ListItem} from './list-item';

export class ListViews extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        const {views, onViewRemoved, onViewEdit} = this.props;
        return (
            <div className="list-view-container">
                {
                    views ? views.map((viewInfo: any, i: number) =>
                        <ListItem key={i}
                                  viewInfo={viewInfo}
                                  onEdit={onViewEdit}
                                  onRemove={onViewRemoved}/>
                    ) : null
                }
            </div>);
    }
}