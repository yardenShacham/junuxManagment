import {getAppStore} from './app.store';
import {getEntityStore} from './entity.store';

export function configureStores(initialState: any) {
    const appStore = getAppStore(initialState);
    const entityStore = getEntityStore(initialState);
    return {
        appStore,
        entityStore
    };
}