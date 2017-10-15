import * as React from "react";
import {inject, observer} from "mobx-react";

@inject('entityStore') @observer
export class EntityEditCreate extends React.Component<any> {

    componentWillMount() {
        let entityId = this.props.match.params.id;
        this.props.entityStore.getEntityById(entityId);
    }

    render() {
        let {currentEntity} = this.props.entityStore;
        let {name, fields} = currentEntity || {name: "", fields: []};
        return (
            <div className="spesific-entity">
                <h2>{name ? `${name} - fields(${fields.length ? fields.length : 'No Fields'})` : ''}</h2>
                <div className="add-new-field-container">
                    <button type="button"
                            className="btn sellBtn btn-success">Add new field
                    </button>
                    <input type="text" className="form-control"
                           ref="fieldName"
                           placeholder="Enter field name..." required/>
                </div>
                <div className="field-list">
                    {
                        fields.map((field: any) =>
                            <div className="field-list-item">
                                <div>{field.name}</div>
                                <span className="glyphicon glyphicon-link"></span>
                                <div>{field.input.inputType}</div>
                            </div>
                        )
                    }
                </div>
            </div>);
    }
}