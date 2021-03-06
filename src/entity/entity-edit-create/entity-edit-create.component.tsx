import * as React from "react";
import {inject, observer} from "mobx-react";
import {FieldList} from './field-list';
import {FieldDraggedBox} from './field-dragged-box'
import {typeIcon} from './field-list/typeToIcon';
import {DraggedToolBox} from '../../common/dragged-tool-box';
import {BtnInput} from '../../common/btn-input';
import {startCase} from 'lodash';
import {FIELD_STATE} from '../entity';

@inject('routing', 'entityStore') @observer
export class EntityEditCreate extends React.Component<any> {
    refs: any
    nameState: any

    componentWillMount() {
        this.initComponent(this.props);
    }



    componentWillReceiveProps(newProps: any) {
        this.initComponent(newProps);
    }

    initComponent(newProps: any) {
        const {push} = newProps.routing;
        let entityId = newProps.match.params.id;
        this.nameState = entityId === "new" ? FIELD_STATE.EDITABLE : FIELD_STATE.CREATED;

        newProps.entityStore.getEntityById(entityId).then((isFound) => {
            if (!isFound) {
                push('/entities');
            }
        });
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
                handle: input.state === FIELD_STATE.EDITABLE ? 'none' : null,
                styles: {maxWidth: input.state === FIELD_STATE.CREATED ? '170px' : '200px'},
                inputType: input.inputType,
                html: <FieldDraggedBox state={input.state}
                                       description={input.description}
                                       inputId={input.inputId}
                                       iconClassName={typeIcon[input.inputType]}>
                </FieldDraggedBox>
            }
        }) : [];
    }

    createEditEntity = (entityName: string) => {
        const {push} = this.props.routing;
        this.props.entityStore.saveEntity(entityName).then((entityId: any) => {
            push(`/entities/${entityId}`);
        });
    }

    render() {
        let {currentEntity, typeNames, allInputs} = this.props.entityStore;
        allInputs = this.transferInputs(allInputs);

        let {name, fields} = currentEntity || {name: "", fields: []};
        return (
            <div className="spesific-entity">
                <div className="list-section">
                    <h2>
                        {
                            this.nameState === FIELD_STATE.EDITABLE ?
                                <div className="entity-edit-section">
                                    <BtnInput onClick={this.createEditEntity}
                                              value={name}
                                              placeholder="Enter Entity name..."
                                              style={{marginRight: '10px', marginTop: '1px'}}
                                              inputStyle={{width: '215px', fontWeight: 'bold'}}
                                              btnLabelName="Save"/>
                                    <span>{` - fields(${fields.length ? fields.length : 'No Fields'})`}</span>
                                </div>
                                : <span>
                                    <span> {name}</span>
                                    <span>{` - fields(${fields.length ? fields.length : 'No Fields'})`}</span>
                              </span>
                        }
                    </h2>
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