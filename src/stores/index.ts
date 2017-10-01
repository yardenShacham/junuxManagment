import {configureStores} from './store.helpers';
import initialState from './state.defaults';
import {registerDependencies} from './app.dependencies.register';

let stores: any
let promise = registerDependencies().then(() => {
    return configureStores(initialState);
});


export function getStores() {
    if (stores) {
        return new Promise((resolve, reject) => {
            resolve(stores);
        });
    }
    else
        return promise;
};