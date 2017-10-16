import * as React from "react";
import {FieldState} from '../../entity';
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

    removeField(fieldId: any) {
        this.props.entityStore.removeField(fieldId);
    }


    render() {
        const {fields, typeNames} = this.props;
        const length = fields.length;
        return (
            <div className="field-list">
                {
                    fields.map((field: any, i: number) => {
                            if (field.state === FieldState.CREATED) {
                                if (i + 1 === length) {
                                    return <div key={i} className="field-list-item last">
                                        <div className="field-name">{field.name}</div>
                                        <div className="link-icon">
                                            <span className="glyphicon glyphicon-link"></span>
                                            {this.getIcon(typeNames, field)}
                                        </div>
                                        <span onClick={this.removeField.bind(this, field.fieldId)}
                                              className="glyphicon glyphicon-remove"></span>
                                    </div>
                                }
                                else {
                                    return <div key={i} className="field-list-item">
                                        <div className="field-name">{field.name}</div>
                                        <div className="link-icon">
                                            <span className="glyphicon glyphicon-link"></span>
                                            {this.getIcon(typeNames, field)}
                                        </div>
                                        <span onClick={this.removeField.bind(this, field.fieldId)}
                                              className="glyphicon glyphicon-remove"></span>
                                    </div>
                                }
                            }
                            else if (field.state === FieldState.EDITABLE) {
                                if (i + 1 === length) {
                                    return <div key={i} className="field-list-item-edit last">
                                        <div className="field-name">{field.name}</div>
                                        <div className="link-icon">
                                            <span className="glyphicon glyphicon-link"></span>
                                            <div className="dragable-input-zone">
                                                <span>Drag Input</span>
                                            </div>
                                            <span onClick={this.removeField.bind(this, field.fieldId)}
                                                  className="glyphicon glyphicon-remove"></span>
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div key={i} className="field-list-item-edit">
                                        <div className="field-name">{field.name}</div>
                                        <div className="link-icon">
                                            <span className="glyphicon glyphicon-link"></span>
                                            <div className="dragable-input-zone">
                                                <span>Drag Input</span>
                                            </div>
                                            <span onClick={this.removeField.bind(this, field.fieldId)}
                                                  className="glyphicon glyphicon-remove"></span>
                                        </div>
                                    </div>
                                }
                            }
                        }
                    )
                }
            </div>);
    }
}