import React, {Component} from 'react';
import {apiHost, strings} from "./Utils";
import axios from 'axios';
import swal from 'sweetalert';

export default class ChangePasswordView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
		this.changePassword = this.changePassword.bind(this);
	}

	componentDidMount() {
		axios.get(apiHost + '/user/getData?id=' + this.props.user.id).then(result=>{
			if (result.data.statusCode === 200) {
				this.setState({
					user: result.data.data
				})
			}
		})
	}

	changePassword() {
		let userName = document.getElementById('userName').value;
		let password = document.getElementById('password').value;
		if (password === null || password.length < 7) {
			swal('Парол 7 та символдан кам бўлмаслиги керак', '', 'error')
		}
		let formData = {};
		formData.id = this.props.user.id;
		formData.userName = userName;
		formData.password = password;

		axios.put(apiHost + '/user/changePassword', formData,
			{
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			})
			.then(result => {
				if (result.data.statusCode === 200) {
					swal(result.data.message, "", 'success');
				} else {
					swal(result.data.message, "", 'error');
				}
			})
	}

	setValue(e) {
		let name = e.target.id;
		let value = e.target.value;
		this.setState({
			[name]: value
		})
	}

	render() {
		return(
			<div style={{margin: "20px"}}>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<h5>{this.state.user.lastName + ' ' + this.state.user.firstName}</h5>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<label htmlFor="userName">{strings.userName}</label>
						<input type="text" className="form-control" id="userName" defaultValue={this.state.user.userName}/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<label htmlFor="password">{strings.password}</label>
						<input type="text" className="form-control" id="password" defaultValue={this.state.user.password}/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 text-center">
						<button className="btn btnGreen" onClick={this.changePassword}>{strings.save}</button>
					</div>
				</div>
			</div>
		)
	}
}