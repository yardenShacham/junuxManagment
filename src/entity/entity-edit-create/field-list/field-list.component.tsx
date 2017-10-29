import * as React from "react";
import listView from './field-list-view';
import {typeIcon} from './typeToIcon';
import {inject} from "mobx-react";

@inject('entityStore')
export class FieldList extends React.Component<any> {

    componentWillMount() {

    }

    getIcon(typeNames: any, field: any) {
        let iconName = typeIcon[typeNames[field.input.inputType]]
        if (iconName)
            return <span className={iconName}></span>
        else
            return <span>{typeNames[field.input.inputType]}</span>
    }

    createField(fieldId: any) {
        this.props.entityStore.createField(fieldId);
    }

    removeField(fieldId: any) {
        this.props.entityStore.removeField(fieldId);
    }


    render() {
        return (
            <div className="field-list">
                {listView.bind(this)()}
            </div>);
    }
}