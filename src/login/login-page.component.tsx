import * as React from "react";
import {inject, observer} from "mobx-react";
import {appInjector} from '../core/appInjector';
import {errorCodeMessages} from './errorCodeMessages';

@inject('appStore') @observer
export class LoginPage extends React.Component<any> {
    static isPublic = true;
    state: any

    constructor() {
        super();
        this.state = {
            errors: []
        }
    }

    refs: any
    signIn = () => {
        let email = this.refs.email.value;
        let pass = this.refs.pass.value;
        appInjector.get('authService').signIn(email, pass).then((user: any) => {
            let {location, history, appStore} = this.props;
            let path = location.state && location.state.comeFrom ? location.state.comeFrom : '/home';
            appStore.updateCurrentUser(user);
            history.push(path);
        }).catch((error: any) => {
            let errorMessage = errorCodeMessages[error.code];
            this.setState({
                errors: [errorMessage]
            });
        });
    }

    componentDidMount() {
        document.body.classList.add('login-screen-background');
    }

    componentWillUnmount() {
        document.body.classList.remove('login-screen-background');
    }

    getErrors = () => {
        let errors = [];
        for (let i = 0; i < this.state.errors.length; i++) {
            errors.push(<span key={i}>{this.state.errors[i]}</span>)
        }
        return errors;
    }

    render() {
        return (
            <div className="login-page">
                <div className="singIn-container">
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <div className="row">
                                <div id="polina" className="col-sm-6">
                                    <h4 className="text-center">Login In</h4>
                                    <form className="form-horizontal">
                                        <div className="form-group has-success has-feedback">
                                            <div className="col-sm-12">
                                                <input type="text" className="form-control" id="eInputSuccess"
                                                       ref="email"
                                                       placeholder="Email" required/>
                                                <span
                                                    className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                            </div>
                                        </div>
                                        <div className="form-group has-success has-feedback">
                                            <div className="col-sm-12">
                                                <input type="password" className="form-control" id="passInputSuccess"
                                                       placeholder="Password"
                                                       ref="pass"
                                                       required/>
                                                <span
                                                    className="glyphicon glyphicon-lock form-control-feedback"></span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="button"
                                                    onClick={this.signIn}
                                                    className="btn sellBtn btn-success">Sign In
                                            </button>
                                        </div>
                                        <div className="text-left errors">
                                            {this.getErrors()}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}