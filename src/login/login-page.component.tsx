import * as React from "react";
import {observer} from "mobx-react";

@observer
export class LoginPage extends React.Component<any> {
    static isPublic = true;

    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        document.body.classList.add('login-screen-background');
    }

    componentWillUnmount() {
        document.body.classList.remove('login-screen-background');
    }

    getErrors = () => {
        let errors = [];
        errors.push(<span>Password is Wrong!!!</span>)
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
                                                       placeholder="Email" required/>
                                                <span
                                                    className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                            </div>
                                        </div>
                                        <div className="form-group has-success has-feedback">
                                            <div className="col-sm-12">
                                                <input type="password" className="form-control" id="passInputSuccess"
                                                       placeholder="Password"
                                                       required/>
                                                <span
                                                    className="glyphicon glyphicon-lock form-control-feedback"></span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="button" className="btn sellBtn btn-success">Sign In</button>
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