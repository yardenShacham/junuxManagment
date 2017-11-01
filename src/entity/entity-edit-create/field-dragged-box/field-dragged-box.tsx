import * as React from "react";
import {inject, observer} from "mobx-react";
import {FieldState} from '../../entity';

@inject('entityStore') @observer
export class FieldDraggedBox extends React.Component<any> {
    refs: any

    render() {
        const {state, iconClassName, inputId, description} = this.props;
        return (state === FieldState.CREATED ? this.getCreated(iconClassName, description)
            : this.getEditable(inputId, iconClassName, description));
    }

    submitInput(inputId: string) {
        let desc = this.refs.description.value;
        this.props.entityStore.createNewInput(inputId, desc);
    }

    getCreated(iconClassName: string, description: string) {
        return (
            <div className="field-box-container created">
                <span className={`icon-section ${iconClassName}`}></span>
                <span className="description-section">{description}</span>
            </div>);
    }

    getEditable(inputId: string, iconClassName: string, description: string) {
        return (
            <div className="field-box-container editable">
                <span className={`icon-section ${iconClassName}`}></span>
                <input type="text"
                       className="form-control description-section"
                       ref="description"
                       placeholder="Enter Description..."
                       required>
                </input>
                <div className="ok-section">
                    <span onClick={this.submitInput.bind(this, inputId)}
                          className="glyphicon glyphicon-ok"></span>
                </div>
            </div>);
    }
}