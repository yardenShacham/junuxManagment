import * as React from "react";
import {inject, observer} from "mobx-react";
import {FieldList} from './field-list';
import {FieldDraggedBox} from './field-dragged-box'
import {typeIcon} from './field-list/typeToIcon';
import {DraggedToolBox} from '../../common/dragged-tool-box';
import {startCase} from 'lodash';
import {FieldState} from '../entity';

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

    createNewInput(inputType: any) {
        this.props.entityStore.addEditableInput(inputType);
    }

    removeInput(input: any) {
        this.props.entityStore.removeUsedInput(input);
    }

    transferInputs(inputs: any[]) {
        return inputs ? inputs.map((input: any) => {
            return {
                id: input.inputId,
                state: input.state,
                handle: input.state === FieldState.EDITABLE ? 'none' : null,
                styles: {maxWidth: input.state === FieldState.CREATED ? '170px' : '200px'},
                inputType: input.inputType,
                html: <FieldDraggedBox state={input.state}
                                       description={input.description}
                                       inputId={input.inputId}
                                       iconClassName={typeIcon[input.inputType]}>
                </FieldDraggedBox>
            }
        }) : [];
    }

    render() {
        let {currentEntity, typeNames, allInputs} = this.props.entityStore;
        allInputs = this.transferInputs(allInputs);

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
                    <div className="create-new-input">
                        <div className="dropdown">
                            <button className="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown">
                                Create new input
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    typeNames ? Object.keys(typeNames).map((key: string, i: number) =>
                                        <li key={i}><a href="#"
                                                       onClick={(e: any) => {
                                                           e.preventDefault();
                                                           this.createNewInput(key)
                                                       }}>{startCase(key)}</a>
                                        </li>
                                    ) : null
                                }
                            </ul>
                        </div>
                    </div>
                    <DraggedToolBox tools={allInputs}
                                    removeToolItem={this.removeInput.bind(this)}
                                    styles={{backgroundColor: 'crimson'}}
                                    onToolDroped={this.onInputDroped}
                                    clearAfterDroped={false}/>

                </div>
            </div>);
    }
}