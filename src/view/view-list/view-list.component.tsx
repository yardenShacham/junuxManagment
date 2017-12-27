import * as React from "react";
import {inject, observer} from "mobx-react";
import {SearchViews} from './search-views';
import {ListViews} from './list-views';
import {confirmAlert} from 'react-confirm-alert';

@inject('viewsStore') @observer
export class ViewList extends React.Component<any> {

    componentDidMount() {
        this.props.viewsStore.getAllViews();
    }

    tryRemoveView = (viewInfo: any) => {
        const {removeView} = this.props.viewsStore;
        confirmAlert({
            title: `Remove ${viewInfo.name} View`,
            message: 'Are you sure you want to remove this view ?',
            confirmLabel: 'Ok',
            cancelLabel: 'Cancel',
            onConfirm: () => removeView(viewInfo.viewId),
        });
    }

    moveToEditView = (viewInfo: any) => {

    }

    render() {
        const {searchedViews} = this.props.viewsStore;
        return (
            <div style={{padding: '30px', width: '60%'}}>
                <SearchViews/>
                <ListViews views={searchedViews}
                           onViewEdit={this.moveToEditView}
                           onViewRemoved={this.tryRemoveView}/>
            </div>);
    }
}