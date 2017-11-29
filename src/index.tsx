import * as React from 'react';
import {render} from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import {Router} from 'react-router';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {getStores} from './stores';
import {App, startApp} from "./app";
import {ErrorPage} from "./common/errorPage";

useStrict(true);

startApp().then((success: any) => {
    const browserHistory = createBrowserHistory();
    const routingStore = new RouterStore();
    /*if (location.pathname === '/') {
        history.push("/home");
    }*/
    let defaultStores = {
        routing: routingStore
    };
    const history = syncHistoryWithStore(browserHistory, routingStore);
    if (success) {
        getStores().then((stores: any) => {
            stores = Object.assign({}, defaultStores, stores);
            render(
                <Provider {...stores}>
                    <Router history={history}>
                        <App history={history}/>
                    </Router>
                </Provider>,
                document.getElementById("app")
            );
        });
    }
}).catch((error: any) => {
    render(
        <ErrorPage error={error}></ErrorPage>,
        document.getElementById("app"));
});