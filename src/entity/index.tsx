import entityList from './entity-list'
import entityEditCreate from './entity-edit-create'
import {addRoute} from '../app.routes';
import {route} from './entity.route';


export default function () {
    entityList();
    entityEditCreate();
    addRoute(route);
}
