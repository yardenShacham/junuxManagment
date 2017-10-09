import login from './login';
import entityModule from './entity';
import dashboard from './dashboard';

export function RegisterModules() {
    return new Promise((resolve, reject) => {
        login();
        entityModule();
        dashboard();

        resolve();
    });
}