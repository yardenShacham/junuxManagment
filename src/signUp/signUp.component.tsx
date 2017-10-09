import * as React from "react";
import {observer} from "mobx-react";

@observer
export class signUpPage extends React.Component<any> {
    static isPublic = true;

    componentDidMount() {
        document.body.classList.add('login-screen-background');
    }

    componentWillUnmount() {
        document.body.classList.remove('login-screen-background');
    }

    render() {
        return (

            <div className="singIn-container">

                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="row">
                            <div id="polina" className="col-sm-6">
                                <h4 className="text-center">Login In</h4>
                                <div className="social text-center">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <a className="btn btn-block btn-social btn-facebook">
                                                <span className="fa fa-facebook"></span> Sign Up
                                            </a>
                                        </div>
                                        <div className="col-sm-6">
                                            <a className="btn btn-block btn-social btn-google">
                                                <span className="fa fa-google"></span> Sign up
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h5>OR</h5>
                                </div>
                                <form className="form-horizontal">
                                    <div className="form-group has-success has-feedback">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" id="fnInputSuccess"
                                                   placeholder="Full Name"
                                                   required/>
                                            <span className="glyphicon glyphicon-user form-control-feedback"></span>
                                        </div>
                                    </div>
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
                                            <input type="text" className="form-control" id="mnInputSuccess"
                                                   placeholder="Mobile Number"
                                                   required/>
                                            <span
                                                className="glyphicon glyphicon-phone form-control-feedback"></span>
                                        </div>
                                    </div>
                                    <div className="form-group has-success has-feedback">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" id="passInputSuccess"
                                                   placeholder="Password"
                                                   required/>
                                            <span
                                                className="glyphicon glyphicon-lock form-control-feedback"></span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn sellBtn btn-success">Sign up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}