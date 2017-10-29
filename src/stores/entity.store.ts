import {Entity, FieldState} from '../entity';
import {appInjector} from '../core/appInjector';
import {action, runInAction, autorun, observable} from 'mobx';
import {map, reject} from 'lodash';
import * as Guid from 'guid';


class EntityStore {

    @observable entities: Entity[] = []
    @observable currentEntity: any
    @observable typeNames: any
    @observable allInputs: any[] = []

    constructor(initialStore: any) {
        appInjector.get('entityService').getTypeEnum()
            .then((typeEnum: any) => this.typeNames = typeEnum);
        this.getAllInputs();
    }


    @action
    getAllInputs() {
        appInjector.get('entityService').getUsedInputs()
            .then((inputs: any) => {
                runInAction(() => {
                    this.allInputs = inputs;
                });
            });
    }

    @action
    async getEntities() {
        let currentUser = await  appInjector.get('authService').waitForCurrentUser();
        let entities = await  appInjector.get('entityService').getEnteties(currentUser.uid);
        runInAction(() => {
            this.entities = map(entities, (val, key) => {
                return Object.assign({}, val, {entityId: key});
            });
        });
    }

    @action
    removeField(fieldId: any) {
        let foundField = this.findField(fieldId);
        if (foundField) {
            if (foundField.state === FieldState.EDITABLE) {
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
            state: FieldState.EDITABLE,
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
                inputType: input.inputType
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
    async getEntityById(id: number) {
        let currentEntity = await appInjector.get('entityService').getEntityById(id);
        currentEntity.fields = currentEntity.fields.map((field: any) => {
            field.state = FieldState.CREATED;
            return field;
        });
        runInAction(() => {
            this.currentEntity = currentEntity;
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
            if (oldFields[i].state === FieldState.EDITABLE) {

            }
        }
    }
}

export function getEntityStore(initialState: any) {
    return new EntityStore({});
}

autorun(() => {

});