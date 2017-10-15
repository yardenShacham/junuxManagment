import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {appInjector} from '../../core/appInjector';
import {inject, observer} from 'mobx-react';

@inject('appStore') @observer
export class Header extends React.Component<any> {
    props: any

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.appStore.waitForUser();
    }

    signOut = (e: any) => {
        e.preventDefault();
        appInjector.get('authService').signOut().then(() => {
            let {history, appStore}  = this.props;
            appStore.updateCurrentUser();
            history.push('./login');
        });
    }

    getUserDetailsSection() {
        let {appStore}  = this.props;
        let userDetails = appStore.currentUserNavDetails;
        if (userDetails) {
            let email = userDetails.email;
            return (
                <div>
                    <span>
                    {email}
                    </span>
                    <a href="#" style={{marginLeft:"10px"}} onClick={this.signOut}>Sign Out</a>
                </div>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="row">
                        <div style={{paddingLeft: '15px' , width:'100%'}} className="navbar-header">
                            <div className="navbar-brand">
                                <Link to="/home">Home</Link>
                            </div>
                            <div className="navbar-brand dropdown">
                                <div className="dropdown-toggle"
                                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <a href="#">Entities</a>
                                    <span className="caret"></span>
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    <li><Link to="/entities">All Entities</Link></li>
                                    <li><Link to="/entities/new">Create new entity</Link></li>
                                </ul>
                            </div>
                            <div className="navbar-brand" style={{float:'right'}}>
                                {this.getUserDetailsSection()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

