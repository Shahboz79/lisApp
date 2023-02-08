import React, {Component} from 'react';
import axios from 'axios';
import {
    apiHost,
    clearBrowserData,
    getUser,
    isLaboratoryDepartment,
    strings
} from './Utils';
import Cookies from 'universal-cookie';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Moment from "react-moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getTime from 'date-fns/getTime';
import authHeader from "./services/auth-header";

const cookies = new Cookies();
const loader = document.querySelector('.loaderBox');
const root = document.getElementById('root');
const showLoader = () => {
	loader.classList.remove('loader--hide');
	loader.classList.add('loader--show');
	root.classList.add('show-blur');
};
const hideLoader = () => {
	loader.classList.add('loader--hide');
	loader.classList.remove('loader--show');
	root.classList.remove('show-blur');
};

export default class PatientList extends Component {

	constructor() {
		super();
		let screenHeight = window.screen.height;
		this.state = {
			tableRows: [],
			appointmentRows: [],
            memberList: [],
			searchKeyword: '',
			searchKeyword2: '',
			searchServiceKeyword: '',
			patientId: '',
			purposeId: null,
			addModalOpen: false,
			listModalOpen: false,
            screenHeight1: screenHeight - 213,
            screenHeight2: screenHeight - 350
		};
		this.search = this.search.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.onReceiveIdFromDevice = this.onReceiveIdFromDevice.bind(this);
		this.searchById = this.searchById.bind(this);
		this.onFilterData2 = this.onFilterData2.bind(this);
		this.loadMembers2 = this.loadMembers2.bind(this);
	}

    setDate(name, date) {
        if (date !== null) {
            date.setHours(12);
            this.setState({
                [name]: date
            });
        } else {
            this.setState({
                [name]: null
            });
        }
        let startDate = name === 'startDate' ? date : this.state.startDate;
        let endDate = name === 'endDate' ? date : this.state.endDate;
        this.onFilterData(startDate, endDate);
    }

	openPage(appointmentId) {
		localStorage.setItem('appointmentId', appointmentId);
		window.open(window.location.protocol + '//' + window.location.host + '/patientView', '_self');
	}

	searchById(e) {
	    let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            let appointmentId = e.target.value;
            localStorage.setItem('appointmentId', appointmentId);
			window.open(window.location.protocol + '//' + window.location.host + '/patientView', '_self');
        }
	}

	getLastAppointment(patientId) {
        let user = getUser();
        axios.get(apiHost + '/patient/appointment/last?patientId=' + patientId + '&memberId=' + user.memberId)
            .then(result => {
                if (result.data.statusCode === 200) {
                    if (result.data.data !== null) {
                    	this.openPage(result.data.data.id);
					}
                }
            })
	}

	editPatient(patientId) {
		localStorage.setItem('patientId', patientId);
		window.open("/editPatient", '_self');
	}

	componentDidMount() {
        this.onFilterData(this.state.startDate, this.state.endDate);
	}

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    };

	onChangeValue(e) {
		this.setState({
			searchKeyword: e.target.value
		})
	}

	onChangeValue2(e) {
		this.setState({
			searchKeyword2: e.target.value
		})
	}

	onReceiveIdFromDevice(e) {
		let devAppointmentId = e.target.value;
		if (devAppointmentId !== undefined && devAppointmentId !== null) {
			devAppointmentId = devAppointmentId.trim();
		}
        if (devAppointmentId !== '') {
            this.openPage(devAppointmentId);
        }
	}

	openAddModal(patientId) {
		this.setState({
			patientId: patientId,
			addModalOpen: true
		});
	}

	closeAddModal() {
		this.setState({
			patientId: '',
			addModalOpen: false
		})
	}

	openListModal(patientId) {
		this.setState({
			patientId: patientId,
			listModalOpen: true
		});
		this.getAppointmentList(patientId);
	}

	closeListModal() {
		this.setState({
			patientId: null,
			listModalOpen: false
		})
	}

	getAppointmentList(patientId) {
        let user = getUser();
		axios.get(apiHost + '/patient/appointment/list?patientId=' + patientId + '&userRole=' + user.role, authHeader())
			.then(result => {
				if (result.data.statusCode === 200) {
					let options = result.data.data.map((row, index) => {
						return <tr key={row.id} onClick={this.openPage.bind(this, row.id)}><td>{index+1}</td>
							<td className="linkStyle">{row.name}</td><td>{row.code}</td></tr>
					});
					this.setState({
						appointmentRows: options
					})
				} else {
					this.setState({
						appointmentRows: []
					})
				}
			})
	}

	search() {
		if (this.state.searchKeyword !== '') {
			axios.get(apiHost + '/patient/search?keyword=' + this.state.searchKeyword).then(result => {
				if (result.data.statusCode === 200) {
					let options = [];
					if (result.data.data !== null) {
						for (let i = 0; i < result.data.data.length; i++) {
							let row = result.data.data[i];
							options.push(<tr>
								<td>{row.id}</td>
								<td>{row.lastName}</td>
								<td>{row.firstName}</td>
								<td>{row.middleName}</td>
								<td>{row.phoneNumber}</td>
								<td>{row.birthDate !== null ? <Moment format="DD.MM.YYYY">{new Date(row.birthDate)}</Moment> :
									<span>&nbsp;</span>}</td>
								<td>{row.address}</td>
								<td>&nbsp;</td>
							</tr>);
						}
					}
					this.setState({
						tableRows: options
					})
				} else {
					this.setState({
						tableRows: []
					})
				}
			})
		}
	}

	onFilterData2() {
		this.onFilterData(this.state.startDate, this.state.endDate);
    }

	onFilterData(startDate, endDate) {
		showLoader();
        let user = getUser();
        let sDate = getTime(startDate);
        let eDate = getTime(endDate);
		let purposeId = null;
		axios.get(apiHost + '/api/appointment/patient/list', { headers: {Authorization: `Bearer ` + user.token} })
			.then(result => {
				if (result.status === 200) {
					let options = [];
					if (result.data.result !== undefined && result.data.result !== null && result.data.result.length > 0) {
						options = result.data.result.map(row=> {
							return <tr key={row.id}>
								<td>{row.id}</td>
								<td>&nbsp;</td>
								<td><span className="linkStyle" onClick={this.openListModal.bind(this, row.id)}>{row.last_name}</span></td>
								<td>{row.first_name}</td>
								<td>{row.middle_name}</td>
								<td>{row.cellphone}</td>
								<td>{row.birthdate !== null ? <Moment format="DD.MM.YYYY">{new Date(row.birthdate)}</Moment> :
									<span>&nbsp;</span>}</td>
								<td>{row.address}</td>
								<td><span>&nbsp;</span></td>
							</tr>
						});
					} else {
						options = []
					}
					this.setState({
						tableRows: options
					});
                    hideLoader();
				} else {
					this.setState({
						tableRows: []
					});
                    hideLoader();
				}
			});
	}

	exportToExcel() {
        let user = getUser();
        let memberId = user.member.id;
        cookies.set('isSportsman', 0, {path: '/'});
        cookies.set('userRole', user.role, {path: '/'});
        cookies.set('userId', memberId, {path: '/'});
        cookies.set('startDate', getTime(this.state.startDate), {path: '/'});
        cookies.set('endDate', getTime(this.state.endDate), {path: '/'});
		let form = document.getElementById('excelForm');
		form.submit();
	}

	openAddPage() {
		clearBrowserData();
		window.open(window.location.protocol + '//' + window.location.host + '/addPatient', '_self');
	}

    loadMembers2() {
        let purpose = document.getElementById('purpose').value;
        this.loadMembers(purpose);
        this.onFilterData(this.state.startDate, this.state.endDate);
    }

    loadMembers(purpose) {
        axios.get(apiHost + '/member/list/byPurpose?purposeId=' + purpose).then(result => {
            if (result.data.statusCode === 200) {
                let options = [];
                if (result.data.data !== undefined && result.data.data !== null) {
                    options = result.data.data.map(row=> {
                        return <option key={'m_' + row.id} value={row.id}>{row.name}</option>
                    });
                }
                options.unshift(<option key='m_all' value={0}>{strings.select}</option>);
                this.setState({
                    memberList: options,
                    purposeId: purpose
                })
            } else {
                this.setState({
                    memberList: [],
                    purposeId: purpose
                })
            }
        });
    }

	render() {
		return (
			<div className="registration">
			<div className="content" style={{height: this.state.screenHeight1}}>
				<div className="card card-body shadow-sm">
					<div className="row">
						<div className="col-md-2">
                            {isLaboratoryDepartment() &&
                                <div className="d-flex">
							        <input className="form-control" id="devSearchBox" autoFocus onChange={this.onReceiveIdFromDevice}/>
                                    <input className="form-control ml-1" id="searchBox2" style={{width: "100px"}}
                                           placeholder="ID" onKeyUp={this.searchById} onKeyDown={this.handleKeyDown}/>
                            </div>
                            }
						</div>
						<div className="col-md-6 text-center">
							<h3>{strings.patients}</h3>
						</div>
						<div className="col-md-4 text-right">
							<div className="input-group">
								<input className="form-control" id="searchBox" placeholder={strings.searchKeyword} aria-label={strings.search} aria-describedby="basic-addon2" type="text" onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}/>
								<div className="input-group-append">
									<button className="btn btnBlue" id="searchButton" onClick={this.search}>{strings.search}</button>
								</div>
							</div>
						</div>
					</div>
					<div className="form-row mt-3">
						<div className="col-md-4 d-flex">
							<DatePicker className="form-control" id="startDate" dateFormat="dd.MM.yyyy"
										locale="uz"
										selected={this.state.startDate}
										onChange={this.setDate.bind(this, 'startDate')}/>
							<DatePicker className="form-control ml-1" id="endDate" dateFormat="dd.MM.yyyy"
										locale="uz"
										selected={this.state.endDate}
										onChange={this.setDate.bind(this, 'endDate')}/>
						</div>
						<div className="col-md-6 d-flex">
							<select id="members" className="form-control" onChange={this.onFilterData2}>
								{this.state.memberList}
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 order-md-1 pt-2 tableScroll w-100" style={{height: this.state.screenHeight2}}>
							<table id="listTable" className="table table-striped table-bordered shadow">
								<thead>
								<tr>
									<th scope="col">{strings.numberSymbol}</th>
									<th scope="col">{strings.time}</th>
									<th scope="col">{strings.lastName}</th>
									<th scope="col">{strings.firstName}</th>
									<th scope="col">{strings.middleName}</th>
									<th scope="col">{strings.phoneNumber}</th>
									<th scope="col">{strings.birthDate}</th>
									<th scope="col">{strings.address}</th>
									<th scope="col">{strings.action}</th>
								</tr>
								</thead>
								<tbody>
								{this.state.tableRows}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<Modal open={this.state.listModalOpen} onClose={this.closeListModal.bind(this)} center>
					<div className="form-row mt-4">
						<div className="col-md-12 mb-3 text-center">
							<h3>{strings.patientVisits}</h3>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-12">
							<table id="treatmentTable" className="table table-striped">
								<thead>
								<tr>
									<th>{strings.numberSymbol}</th>
									<th>{strings.treatmentTime}</th>
									<th>{strings.doctor}</th>
								</tr>
								</thead>
								<tbody>
								{this.state.appointmentRows}
								</tbody>
							</table>
						</div>
					</div>
				</Modal>
			</div>
			</div>
		)
	}
}