import './entity.scss';
import entityList from './entity-list'
import entityEditCreate from './entity-edit-create'
import {addRoute} from '../app.routes';
import {route} from './entity.route';

export {Entity, FIELD_STATE, Field, FieldRulls, PageInfo} from './entity'

export default function () {
    entityList();
    entityEditCreate();
    addRoute(route);
}
