import * as React from "react";
import {inject, observer} from "mobx-react";
import {FieldList} from './field-list';
import {DraggedToolBox} from '../../common/dragged-tool-box';

@inject('entityStore') @observer
export class EntityEditCreate extends React.Component<any> {
    refs: any

    componentWillMount() {
        let entityId = this.props.match.params.id;
        this.props.entityStore.getEntityById(entityId);
    }

    startAddFieldProcess = () => {
        let fieldName = this.refs.fieldName.value;
        this.props.entityStore.addFieldName(fieldName);
    }

    onInputDroped = (input: any, elementDroped: any) => {
        let fieldId = elementDroped.classList[elementDroped.classList.length - 1];
        this.props.entityStore.addInputById(fieldId, input);
    }

    render() {
        let {currentEntity, typeNames, allInputs} = this.props.entityStore;
        let {name, fields} = currentEntity || {name: "", fields: []};
        return (
            <div className="spesific-entity">
                <div className="list-section">
                    <h2>{name ? `${name} - fields(${fields.length ? fields.length : 'No Fields'})` : ''}</h2>
                    <div className="add-new-field-container">
                        <button type="button"
                                onClick={this.startAddFieldProcess}
                                className="btn sellBtn btn-success">Add new field
                        </button>
                        <input type="text" className="form-control"
                               ref="fieldName"
                               placeholder="Enter field name..." required/>
                    </div>
                    <FieldList fields={fields} typeNames={typeNames}/>
                </div>
                <div className="input-section">
                    <DraggedToolBox tools={allInputs}
                                    onToolDroped={this.onInputDroped}
                                    clearAfterDroped={false}/>
                </div>
            </div>);
    }
}