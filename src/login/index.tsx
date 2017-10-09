import './login-page.scss';
import {addRoute} from '../app.routes';
import {route} from './login.route';


export default function () {
    addRoute(route);
}
