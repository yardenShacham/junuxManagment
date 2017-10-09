import {Entity} from '../entity'
import {action, runInAction, autorun, observable} from 'mobx';


class EntityStore {

    @observable entities: Entity[]

    constructor(initialStore: any) {

    }

    @action
    async getEntities() {
       /* let a = await  this.entityService.getEnteties();
        runInAction(() => {
            this.entities = a;
        });*/
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