import {Entity} from '../entity';
import {appInjector} from '../core/appInjector';
import {action, runInAction, autorun, observable} from 'mobx';
import {map} from 'lodash'


class EntityStore {

    @observable entities: Entity[] = []

    constructor(initialStore: any) {
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
    async getEntityById(id: number) {

    }


}

export function getEntityStore(initialState: any) {
    return new EntityStore({});
}

autorun(() => {

});