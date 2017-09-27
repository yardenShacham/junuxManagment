import {configureStores} from './store.helpers';
import initialState from './state.defaults';
import {injector} from 'jx-injector';
import {registerDependencies} from './app.dependencies.register';

let stores: any
registerDependencies(injector).then(() => {
    stores = configureStores(injector, initialState);
});


export default stores;