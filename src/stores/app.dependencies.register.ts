import {TestService} from '../core/testService'

export function registerDependencies(injector: any) {
    return new Promise((resolve, reject) => {
        if (injector) {
            injector.registerSingleton("testService", TestService);
            resolve();
        }
        else {
            reject("rejector has does not exsit or have some problems");
        }
    });
}