import React, {Component} from 'react';
import {apiHost, strings} from "./Utils";
import axios from 'axios';
import swal from 'sweetalert';

export default class SetPasswordView extends Component {

	constructor(props) {
		super(props);
	}

    changeMemberPassword() {
		let oldPassword = document.getElementById('oldPassword').value;
		let password = document.getElementById('password').value;
		if (password === null || password.length < 7) {
			swal('Парол 7 та символдан кам бўлмаслиги керак', '', 'error')
		}
		let formData = {};
		formData.id = this.props.user.id;
		formData.oldPassword = oldPassword;
		formData.password = password;

		axios.post(apiHost + '/user/changeMembersPassword?id=' + this.props.user.id + '&oldPassword=' + oldPassword + '&password=' + password).then(result => {
			if (result.data.statusCode === 200) {
				swal(result.data.message, "", 'success');
			} else {
				swal(result.data.message, "", 'error');
			}
		})
	}

	render() {
		return(
			<div style={{margin: "20px"}}>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<h5>{this.props.user.lastName + ' ' + this.props.user.firstName +
						(this.props.user.middleName !== undefined && this.props.user.middleName !== null ? ' ' + this.props.user.middleName : '')}</h5>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<label htmlFor="oldPassword">{strings.oldPassword}</label>
						<input type="password" className="form-control" id="oldPassword"/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<label htmlFor="password">{strings.password}</label>
						<input type="password" className="form-control" id="password"/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 text-center">
						<button className="btn btnGreen" onClick={this.changeMemberPassword.bind(this)}>{strings.save}</button>
					</div>
				</div>
			</div>
		)
	}
}