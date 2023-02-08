import React, {Component} from 'react';
import logo from './images/index_logo.png';
import * as _ from './Utils';
import axios from 'axios';
import {Alert} from "reactstrap";
import Footer from "./Footer";
import swal from 'sweetalert';

class LoginPage extends Component {

  constructor() {
    super();
    this.state = {
      showAlert: false
    }
  }

    login() {
        let userName = document.getElementById('userName').value;
        let password = document.getElementById('password').value;
        let data = {
            'userName': userName,
            'password': password
        };
        axios.post(_.apiHost + '/api/user/login', data)
            .then(result => {
                if (result.status === 200) {
                    if (result.data.language !== null) {
                        _.strings.setLanguage(result.data.language !== undefined && true ? result.data.language : 'uz');
                    } else {
                        _.strings.setLanguage('uz');
                    }
                    localStorage.setItem('user', JSON.stringify(result.data));
                    if (result.data.roles[0] === 'LABORATORY') {
                        window.open(window.location.href + "laboratory", "_self");
                    } else if (result.data.roles[0] === 'HEADOFLABORATORY') {
                        window.open(window.location.href + "laboratoryHead", "_self");
                    } else if (result.data.roles[0] === 'ADMIN') {
                        window.open(window.location.href + "admin", "_self");
                    } else if (result.data.roles[0] === 'DIRECTOR') {
                        window.open(window.location.href + "director", "_self");
                    }
                } else {
                    swal(result.message, '', 'error');
                }
            })
    }

    closeAlert() {
        this.setState({
            showAlert: false
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("loginButton").click();
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="loginPage">
                    <div className="text-center">
                        <div className="form-signin">
                            <img className="mb-4" style={{width: "365px"}} src={logo} alt=""/>
                            <h1 className="h3 mb-3 font-weight-normal">Тизимга кириш</h1>
                            <label htmlFor="userName" className="sr-only">{_.strings.userName}</label>
                            <input type="text" id="userName" name="userName" className="form-control bottom-radius0"
                                   placeholder="Логин" autoFocus="" onKeyDown={this.handleKeyDown}/>
                            <label htmlFor="password" className="sr-only">{_.strings.password}</label>
                            <input type="password" id="password" name="password" className="form-control"
                                   placeholder="Парол" onKeyDown={this.handleKeyDown}/>
                            <button className="btn btn-lg  btn-block" id="loginButton"
                                    onClick={this.login.bind(this)}>{_.strings.login}</button>
                        </div>
                    </div>
                    <div className="container text-center" style={{width: "600px"}}>
                        <Alert isOpen={this.state.showAlert} color="danger" transition={{in: true, timeout: 150}}
                               toggle={this.closeAlert.bind(this)}>
                            Логин ёки парол хато киритилган.
                        </Alert>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default LoginPage;