import entityModule from './entity';
import dashboard from './dashboard';

export function RegisterModules() {
    return new Promise((resolve, reject) => {
        entityModule();
        dashboard();

        resolve();
    });
}