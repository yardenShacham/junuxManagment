import * as React from "react";
import {FieldState} from '../../entity';

export class FieldList extends React.Component<any> {

    componentWillMount() {

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
                                    return  <div key={i} className="field-list-item last">
                                        <div>{field.name}</div>
                                        <span className="glyphicon glyphicon-link"></span>
                                        <div>{typeNames[field.input.inputType]}</div>
                                    </div>
                                }
                                else {
                                    return  <div key={i} className="field-list-item">
                                        <div>{field.name}</div>
                                        <span className="glyphicon glyphicon-link"></span>
                                        <div>{typeNames[field.input.inputType]}</div>
                                    </div>
                                }
                            }
                            else if (field.state === FieldState.EDITABLE) {
                                if (i + 1 === length) {
                                    return  <div key={i} className="field-list-item-edit last">
                                        <div>{field.name}</div>
                                        <span className="glyphicon glyphicon-link"></span>
                                        <div className="dragable-input-zone"></div>
                                    </div>
                                }
                                else {
                                    return  <div key={i} className="field-list-item-edit">
                                        <div>{field.name}</div>
                                        <span className="glyphicon glyphicon-link"></span>
                                        <div className="dragable-input-zone">
                                            <span>Drag Input</span>
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