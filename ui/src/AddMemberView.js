import React, {Component} from 'react';
import {apiHost, strings} from "./Utils";
import axios from 'axios';
import swal from 'sweetalert';

export default class AddMemberView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lastName: '',
			firstName: '',
			middleName: '',
			userName: '',
			password: '',
			position: '',
			positions: [],
            department: '',
            purposes: []
		};
		this.setValue = this.setValue.bind(this);
		this.saveMember = this.saveMember.bind(this);
	}

	componentDidMount() {
        let options = [];
        options.push(<option key='pl_0' value={0}>Танланг</option>);
        options.push(<option key='pl_1' value={1}>Поликлиника</option>);
        options.push(<option key='pl_2' value={2}>Стационар</option>);
        options.push(<option key='pl_3' value={3}>Лаборатория</option>);
        options.push(<option key='pl_4' value={4}>Физиотерапия</option>);
        options.push(<option key='pl_5' value={5}>Функционал диагностика</option>);
        options.push(<option key='pl_6' value={6}>Нурли ташхис</option>);
		options.push(<option key='pl_7' value={7}>Тез ёрдам</option>);
		options.push(<option key='pl_8' value={8}>Психолоия</option>);
		options.push(<option key='pl_9' value={9}>Процедура</option>);
		options.push(<option key='pl_10' value={10}>Администрация</option>);
		options.push(<option key='pl_11' value={11}>Илмий тадқиқот лаборатория бўлинмаси</option>);
		options.push(<option key='pl_12' value={12}>Спорт тиббиёти бўлими</option>);
		options.push(<option key='pl_13' value={13}>Дорихона</option>);
        this.setState({
           purposes: options
        });
		if (this.props.member !== undefined && this.props.member !== null) {
			this.setState({
				lastName: this.props.member.lastName,
				firstName: this.props.member.firstName,
                middleName: this.props.member.middleName
			})
		}
		axios.get(apiHost + '/member/positions').then(result=>{
			if (result.data.statusCode === 200) {
				let items = result.data.data.map(row=>{
					return <option key={'m_' + row.id} value={row.id}>{row.name}</option>
				});
				items.unshift(<option key="m_0" value="0">{strings.select}</option>);
				this.setState({
					positions: items
				});
				if (this.props.member !== undefined && this.props.member !== null && this.props.member.position !== undefined && this.props.member.position !== null) {
					this.setState({
						position: this.props.member.position.id,
					})
				}
			}
		})
	}

	saveMember() {
		let position = {};
		position.id = this.state.position;
		let department = {};
        department.id = this.state.department;
		let formData = {
			"lastName": this.state.lastName,
			"firstName": this.state.firstName,
			"middleName": this.state.middleName,
			"position": position,
			"department": department,
		};
		if (this.props.member === undefined || this.props.member === null) {
			formData.userName = this.state.userName;
			formData.password = this.state.password;
		} else {
            formData.id = this.props.member.id;
		}
		axios.post(apiHost + '/member/add', formData)
			.then(result => {
				if (result.data.statusCode === 200) {
					swal(result.data.message, "", 'success');
					this.setState({
						lastName: '',
						firstName: '',
						middleName: '',
						position: 0
					});
					this.props.getMemberList();
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
						<input type="text" className="form-control" id="lastName" defaultValue={this.state.lastName}
						       placeholder="Фамилияси" onChange={this.setValue}/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<input type="text" className="form-control" id="firstName" defaultValue={this.state.firstName}
						       placeholder="Исми" onChange={this.setValue}/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<input type="text" className="form-control" id="middleName" defaultValue={this.state.middleName}
						       placeholder="Шарифи" onChange={this.setValue}/>
					</div>
				</div>
                {(this.props.member === undefined || this.props.member === null) &&
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<input type="text" className="form-control" id="userName" placeholder="Логин"
							   onChange={this.setValue}/>
					</div>
				</div>
                }
                {(this.props.member === undefined || this.props.member === null) &&
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<input type="text" className="form-control" id="password" placeholder="Парол"
							   onChange={this.setValue}/>
					</div>
				</div>
                }
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<label htmlFor="position">{strings.position}</label>
						<select className="form-control" id="position" onChange={this.setValue} defaultValue={this.state.position}>
							{this.state.positions}
						</select>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 mb-2">
						<label htmlFor="department">{strings.department}</label>
						<select className="form-control" id="department" onChange={this.setValue} defaultValue={this.state.department}>
							{this.state.purposes}
						</select>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12 text-center">
						<button className="btn btnGreen" onClick={this.saveMember}>{strings.save}</button>
					</div>
				</div>
			</div>
		)
	}
}