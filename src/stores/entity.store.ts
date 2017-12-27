import {Entity, FIELD_STATE} from '../entity';
import {lifeStyleMethods} from 'jx-core/src/auth-service/lifeStyleMethods';
import {appInjector} from '../core/appInjector';
import {action, runInAction, autorun, observable} from 'mobx';
import {map, reject, forEach} from 'lodash';
import * as Guid from 'guid';


class EntityStore {

    @observable entities: Entity[] = []
    @observable currentEntity: any
    @observable typeNames: any
    @observable allInputs: any[] = []
    initProcess: any

    constructor(initialStore: any) {
        this.initProcess = appInjector.get('authService').waitForCurrentUser().then((user: any) => {
            return this.onUserSignIn(user);
        }).catch((error: any) => {
            appInjector.get('authService').addLifeStyleCallback(lifeStyleMethods.onSignIn, this.onUserSignIn);
        });

    }

    onUserSignIn(user: any) {
        if (!this.typeNames) {
            let tasks = [];
            let entityService = appInjector.get('entityService');
            tasks.push(entityService.getInputTypeEnum()
                .then((typeEnum: any) => {
                    runInAction(() => {
                        this.typeNames = typeEnum;
                    })
                }));
            tasks.push(this.getAllInputs());
            return Promise.all(tasks).then(() => {
                return user;
            });
        }
    }

    @action
    saveEntity(entityName: string) {
        let promise;
        if (this.currentEntity.entityId)
            promise = appInjector.get('entityService').updateEntity(this.currentEntity.entityId, {
                name: entityName
            });
        else {
            promise = appInjector.get('entityService').createEntity({
                fields: [],
                name: entityName
            });
        }
        return promise;
    }

    @action
    addEditableInput(inputType: any) {
        this.allInputs.push({
            inputId: Guid.raw(),
            inputType: inputType,
            description: "",
            state: FIELD_STATE.EDITABLE
        });
    }

    @action
    ChangeInputEditMode(inputId: any) {
        let index = this.allInputs.findIndex((i: any) => i.inputId === inputId);
        if (index !== -1)
            this.allInputs[index].state = FIELD_STATE.EDITABLE;
    }

    @action
    saveUserInput(inputId: string, description: string) {
        let foundInput = this.allInputs.find((i: any) => i.inputId === inputId);
        if (foundInput) {
            appInjector.get('entityService')
                .saveUserInput(foundInput.inputType, description, inputId).then(() => {
                foundInput.isOnCreate = true;
                this.getAllInputs();
            });
        }
    }

    @action
    removeUsedInput(input: any) {
        if (input.state === FIELD_STATE.EDITABLE) {
            this.allInputs = reject(this.allInputs, (i: any) => i.inputId === input.id);
        }
        else if (input.state === FIELD_STATE.CREATED) {
            return appInjector.get('entityService').removeUsedInput(input.id).then(() => {
                this.getAllInputs();
            });
        }
    }

    @action
    getAllInputs() {
        return appInjector.get('entityService').getUsedInputs()
            .then((inputs: any) => {
                runInAction(() => {
                    let allInputs = [];
                    if (inputs) {

                        if (this.allInputs) {
                            for (let i = 0; i < this.allInputs.length; i++) {
                                if (this.allInputs[i].state === FIELD_STATE.EDITABLE && !this.allInputs[i].isOnCreate) {
                                    allInputs.push(this.allInputs[i]);
                                }
                            }
                        }

                        forEach(inputs, (val: any, key: string) => {
                            allInputs.push({
                                inputId: key,
                                state: FIELD_STATE.CREATED,
                                inputType: val.inputType,
                                description: val.description
                            });
                        });

                    }

                    this.allInputs = allInputs;
                });
            });
    }

    @action
    async getEntities() {
        await this.initProcess.then(async (user: any) => {
            let entities = await
                appInjector.get('entityService').getEnteties(user.uid);
            runInAction(() => {
                this.entities = map(entities, (val, key) => {
                    return Object.assign({}, val, {entityId: key});
                });
            });

        });

    }

    @action
    removeField(fieldId: any) {
        let foundField = this.findField(fieldId);
        if (foundField) {
            if (foundField.state === FIELD_STATE.EDITABLE) {
                this.currentEntity.fields =
                    reject(this.currentEntity.fields, (field: any) => fieldId ? field.fieldId === fieldId : false);
            }
            else {
                appInjector.get('entityService').removeField(this.currentEntity.entityId, fieldId).then(() => {
                    this.getEntityById(this.currentEntity.entityId);
                });
            }
        }
    }

    @action
    addFieldName(fieldName: string) {
        this.currentEntity.fields.unshift({
            fieldId: Guid.raw(),
            state: FIELD_STATE.EDITABLE,
            name: fieldName,
            input: null
        });
    }

    @action
    addInputById(fieldId: number, input: any) {
        let foundIndex = this.currentEntity.fields.findIndex((field: any) => field.fieldId === fieldId);
        this.currentEntity.fields[foundIndex] = {
            fieldId: this.currentEntity.fields[foundIndex].fieldId,
            state: this.currentEntity.fields[foundIndex].state,
            name: this.currentEntity.fields[foundIndex].name,
            input: {
                inputId: input.id,
                inputType: this.typeNames[input.inputType]
            }
        }
    }

    @action
    createField(fieldId: any) {
        let foundField = this.findField(fieldId);
        if (foundField) {
            appInjector.get('entityService')
                .addField(this.currentEntity.entityId, foundField.name, foundField.input.inputType)
                .then(() => {
                    this.getEntityById(this.currentEntity.entityId);
                });
        }
    }

    @action
    getEntityById(id: any) {
        return this.initProcess.then(async (user: any) => {
            let currentEntity;
            if (id === "new")
                currentEntity = {
                    entityId: null,
                    state: FIELD_STATE.EDITABLE,
                    fields: [],
                    name: ''
                };
            else {
                currentEntity = await appInjector.get('entityService').getEntityById(id);
            }

            if (currentEntity) {
                currentEntity.state = currentEntity.state ? currentEntity.state : FIELD_STATE.CREATED;
                currentEntity.fields = currentEntity.fields.map((field: any) => {
                    field.state = FIELD_STATE.CREATED;
                    return field;
                });
                runInAction(() => {
                    this.currentEntity = currentEntity;
                });
                return true;
            }
            return null;
        });
    }


    findField(fieldId: any) {
        for (let i = 0; i < this.currentEntity.fields.length; i++) {
            if (this.currentEntity.fields[i].fieldId === fieldId) {
                return this.currentEntity.fields[i];
            }
        }
        return null;
    }

    mergeFields(oldFields: any, currentFields: any) {
        for (let i = 0; i < oldFields.length; i++) {
            if (oldFields[i].state === FIELD_STATE.EDITABLE) {

            }
        }
    }
}

export function getEntityStore(initialState: any) {
    return new EntityStore({});
}

autorun(() => {

});