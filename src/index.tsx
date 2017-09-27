import * as React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import stores from './stores';
import {App, startApp} from "./app";
import {ErrorPage} from "./common/errorPage";

useStrict(true);

startApp().then((success: any) => {
    const history = createBrowserHistory();

    if (location.pathname === '/') {
        history.push("/hotels");
    }

    if (success) {
        render(
            <Provider {...stores}>
                <Router history={history}>
                    <App/>
                </Router>
            </Provider>,
            document.getElementById("app")
        );
    }
}).catch((error: any) => {
    render(
        <ErrorPage error={error}></ErrorPage>,
        document.getElementById("app"));
});