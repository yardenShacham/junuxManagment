import './assets/app.scss';
import * as React from 'react';
import {RegisterModules} from './module.register';
import {Header} from './common/header';
import {Routes} from './app.routes';

export function startApp() {
    return RegisterModules().then(() => {
        // you can login and init some stuff
        return true;
    });

}

export class App extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    props: any

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                {Routes}
            </div>);
    }
}