import './view.scss';
import {addRoute} from '../app.routes';
import {route} from './view.route';
import mobileView from './mobileView';
import viewList from './view-list';
import webView from './webView';

export default function () {
    viewList();
    webView();
    mobileView()
    addRoute(route);
}
