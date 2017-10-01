import {getAppStore} from './app.store';

export function configureStores(initialState: any) {
    const appStore = getAppStore(initialState);

    return {
        appStore
    };
}