import * as React from 'react';
import {Navbar} from './navbar/navbar.component';
import {appInjector} from '../../core/appInjector';
import {inject, observer} from 'mobx-react';
import {NAVBAR_BRANDS} from './navbar-configuration';

@inject('appStore') @observer
export class Header extends React.Component<any> {
    props: any

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.appStore.waitForUser();
    }

    signOut = (e: any) => {
        e.preventDefault();
        appInjector.get('authService').signOut().then(() => {
            let {history, appStore} = this.props;
            appStore.updateCurrentUser();
            history.push('./login');
        });
    }

    getUserDetailsSection() {
        let {appStore} = this.props;
        let userDetails = appStore.currentUserNavDetails;
        if (userDetails) {
            let email = userDetails.email;
            return [
                <span key={0}>{email}</span>,
                <a key={1} href="#" style={{marginLeft: "10px"}} onClick={this.signOut}>Sign Out</a>
            ];
        }
    }

    render() {
        return (
            <Navbar brands={NAVBAR_BRANDS} userDetails={this.getUserDetailsSection()}/>
        );
    }
}

