import {Entity, FieldState} from '../entity';
import {appInjector} from '../core/appInjector';
import {action, runInAction, autorun, observable} from 'mobx';
import {map, reject} from 'lodash';
import * as Guid from 'guid';


class EntityStore {

    @observable entities: Entity[] = []
    @observable currentEntity: any
    @observable typeNames: any
    @observable allInputs: any[]

    constructor(initialStore: any) {
        this.typeNames = appInjector.get('entityService').getTypeEnum();
        this.allInputs = [{id: 1, inputType: 5}];
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
        this.currentEntity.fields = reject(this.currentEntity.fields, (field: any) => fieldId ? field.fieldId === fieldId : false);
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

    @action createField(field: any){

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

}

export function getEntityStore(initialState: any) {
    return new EntityStore({});
}

autorun(() => {

});