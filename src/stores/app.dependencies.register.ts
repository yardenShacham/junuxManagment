import {StyleService} from '../core/styleService'
import {appInjector} from '../core/appInjector';


export function registerDependencies() {
    return new Promise((resolve, reject) => {
        if (appInjector) {
            appInjector.registerSingleton("styleService", StyleService);
            resolve();
        }
        else {
            reject("rejector has does not exsit or have some problems");
        }
    });
}




