import {FieldState} from '../../entity';
import * as React from "react";

export default function () {

    const {fields, typeNames, onInputDroped} = this.props;
    const length = fields.length;
    return (
        fields.map((field: any, i: number) => {
                if (field.state === FieldState.CREATED) {
                    return getCreated.call(this, i, length, field, reverseObj(typeNames));
                }
                else if (field.state === FieldState.EDITABLE) {
                    return getEditable.call(this, i, length, field, reverseObj(typeNames));
                }
            }
        )
    )
}

function reverseObj(obj: any) {
    let keys = Object.keys(obj);
    let newReverseObj: any = {};
    for (let i = 0; i < keys.length; i++) {
        let val = obj[keys[i]];
        newReverseObj[val] = keys[i];
    }
    return newReverseObj;
}

function getCreated(index: any, length: any, field: any, typeNames: any) {
    return (
        <div key={index} className={`field-list-item ${index + 1 === length ? 'last' : ''}`}>
            <div className="field-name">{field.name}</div>
            <div className="link-icon">
                <span className="glyphicon glyphicon-link"></span>
                {this.getIcon(typeNames, field)}
            </div>
            <span onClick={this.removeField.bind(this, field.fieldId)}
                  className="glyphicon glyphicon-remove"></span>
        </div>
    )
}

function getEditable(index: any, length: any, field: any, typeNames: any) {
    let isInputExist = field.input && field.input.inputId && field.input.inputType;
    return (
        <div key={index} className={`field-list-item-edit ${index + 1 === length ? 'last' : ''}`}>
            <div className="field-name">{field.name}</div>
            <div className="link-icon">
                <span className="glyphicon glyphicon-link"></span>
                {
                    isInputExist ?
                        <span onClick={this.createField.bind(this, field.fieldId)}
                              className="glyphicon glyphicon-ok"></span>
                        :
                        <div className={`drop-zone-input drop-zone ${field.fieldId}`}>
                            <span>Drop Input</span>
                        </div>
                }
            </div>
            <span onClick={this.removeField.bind(this, field.fieldId)}
                  className="glyphicon glyphicon-remove"></span>
        </div>
    );
}