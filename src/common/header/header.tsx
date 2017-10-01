import * as React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

@inject('appStore') @observer
export class Header extends React.Component<any> {

    constructor() {
        super();
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="row">
                        <div style={{paddingLeft: '15px'}} className="navbar-header">
                            <div className="navbar-brand">
                                <Link to="/home">Home</Link>
                            </div>
                            <div className="navbar-brand">
                                <Link to="/entities">Entities</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

