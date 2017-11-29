import {getAppStore} from './app.store';
import {getEntityStore} from './entity.store';
import {getViewStore} from './view.store';

export function configureStores(initialState: any) {
    const appStore = getAppStore(initialState);
    const entityStore = getEntityStore(initialState);
    const viewsStore = getViewStore(initialState);

    return {
        appStore,
        entityStore,
        viewsStore
    };
}