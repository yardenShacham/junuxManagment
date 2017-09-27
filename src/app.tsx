import './assets/app.scss';
import * as React from 'react';
import {inject, observer} from 'mobx-react';

import stores from "./stores";
import {Header} from './common/header';
import {Routes} from './app.routes';

export function startApp() {
    let configPromise = new Promise((resolve: any, reject: any) => {
        /* createConfigurationService({}, (configurations: any) => {
             if (configurations && configurationService.init(configurations)) {
                 bootInit();
                 userCacheService.init();
                 cacheService.init();

                 searchHotel();
                 hotelContent();

                 resolve(configurations);
             }

             reject(new Error('configuration error'))
         });*/
        resolve();
    });
    return configPromise;
}

export class App extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                {Routes}
            </div>);
    }
}