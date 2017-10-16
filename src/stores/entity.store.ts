import {Entity, FieldState} from '../entity';
import {appInjector} from '../core/appInjector';
import {action, runInAction, autorun, observable} from 'mobx';
import {map, reject} from 'lodash'


class EntityStore {

    @observable entities: Entity[] = []
    @observable currentEntity: any
    @observable typeNames: any

    constructor(initialStore: any) {
        this.typeNames = appInjector.get('entityService').getTypeEnum();
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

        /*let foundIndex = this.currentEntity.fields.findIndex((field: any) => field.fieldId == fieldId);
        if (foundIndex !== -1) {
             this.currentEntity.fields.slice(foundIndex, foundIndex + 1);
        }*/
        this.currentEntity.fields = reject(this.currentEntity.fields, (field: any) => field.fieldId === fieldId);
    }

    @action
    addFieldName(fieldName: string) {
        this.currentEntity.fields.unshift({
            state: FieldState.EDITABLE,
            name: fieldName,
            input: null
        });
    }

    @action
    addInputById(fieldId: number, inputId: number) {
        let foundIndex = this.currentEntity.fields.findIndex((field: any) => field.fieldId === fieldId);
        this.currentEntity.fields[foundIndex].input = {
            inputId: inputId
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

}

export function getEntityStore(initialState: any) {
    return new EntityStore({});
}

autorun(() => {

});