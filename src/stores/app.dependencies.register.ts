import {StyleService} from '../core/styleService'
import {appInjector} from '../core/appInjector';
import {authService, entityService} from 'jx-core/src';

export function registerDependencies() {
    return new Promise((resolve, reject) => {
        if (appInjector) {
            appInjector.registerSingleton("styleService", StyleService);
            appInjector.registerSingleton("authService", authService);
            //  appInjector.registerSingleton("entityService", entityService);

            resolve();
        }
        else {
            reject("rejector has does not exsit or have some problems");
        }
    });
}




