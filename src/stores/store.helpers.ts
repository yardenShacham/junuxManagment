import {getAppStore} from './app.store';

export function configureStores(injector: any, initialState: any) {
    const appStore = getAppStore(injector, initialState);

    return {
        appStore
    };
}