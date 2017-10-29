import {FieldState} from '../../entity';
import * as React from "react";
export default  function () {

    const {fields, typeNames, onInputDroped} = this.props;
    const length = fields.length;
    return (
        fields.map((field: any, i: number) => {
                if (field.state === FieldState.CREATED) {
                    return getCreated.call(this, i, length, field, typeNames);
                }
                else if (field.state === FieldState.EDITABLE) {
                    return getEditable.call(this, i, length, field, typeNames);
                }
            }
        )
    )
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
                        this.getIcon(typeNames, field) :
                        <div className={`drop-zone-input drop-zone ${field.fieldId}`}>
                            <span>Drop Input</span>
                        </div>
                }
                {
                    isInputExist ?
                        <span onClick={this.createField.bind(this, field.fieldId)}
                              className="glyphicon glyphicon-ok"></span>
                        :
                        null
                }
                <span onClick={this.removeField.bind(this, field.fieldId)}
                      className="glyphicon glyphicon-remove"></span>
            </div>
        </div>
    );
}