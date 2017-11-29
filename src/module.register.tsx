import login from './login';
import entityModule from './entity';
import dashboard from './dashboard';
import views from './view';

export function RegisterModules() {
    return new Promise((resolve, reject) => {
        login();
        entityModule();
        dashboard();
        views();

        resolve();
    });
}