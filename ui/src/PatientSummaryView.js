import React, {Component} from 'react';
import {apiHost, getUser, isHeadOfLaboratory, isLaboratory, strings} from './Utils';
import axios from 'axios';
import Moment from "react-moment";
import swal from "sweetalert";
import {Tab, Tabs} from "react-bootstrap";
import PatientLaboratoryList from "./PatientLaboratoryList";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

class PatientSummaryView extends Component {

    constructor(props) {
        super(props);
        let user = getUser();
        this.state = {
            user: user,
            key: (isLaboratory(user) || isHeadOfLaboratory(user)) ? 'laboratory' : 'home',
            appointment: props.appointment !== undefined && props.appointment !== null ? props.appointment :
                {
                    id: null,
                    startDate: new Date(),
                    patient: {},
                    duration: 1,
                    status: {
                        id: 1
                    },
                    paymentStatus: {
                        "id": 1
                    }
                },
            patient: {
                id: '',
                sex: {
                    name: ''
                },
                invalid: {
                    name: ''
                },
                treatmentType: {
                    id: 1,
                    name: ''
                },
                status: {
                    id: 1,
                    name: ''
                },
            },
            problem: '',
            appointmentId: null,
            services: [],
            doctorCheckList: [],
            executorMembers: [],
            addServicesModalOpen: false,
            executedService: null,
            serviceExecModalOpen: false,
            content: user.template !== undefined && user.template !== null ? user.template.content : '',
            templateContent: user.template !== undefined && user.template !== null ? user.template.content : ''
        };
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const appointmentId = localStorage.getItem('appointmentId');

        axios.get(apiHost + '/appointment/get?id=' + appointmentId + '&isStationary=false').then(result => {
            if (result.data.statusCode === 200) {
                if (result.data.data !== undefined && result.data.data !== null) {
                    let doctorCheckList = [];
                    if (result.data.data.doctorCheckList !== null) {
                        doctorCheckList = result.data.data.doctorCheckList.map(item=>{
                            if (item.doctor.id === this.state.user.id) {
                                this.setState({content: item.content})
                            }
                            return <div className="card">
                                <div className="card-header" id={"heading" + item.id}>
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse"
                                                data-target={"#collapseDiv" + item.id} aria-expanded="true"
                                                aria-controls={"collapseDiv" + item.id}>
                                            {item.doctor.name}
                                        </button>
                                    </h5>
                                </div>

                                <div id={"collapseDiv" + item.id} className="collapse" aria-labelledby={"heading" + item.id}
                                     data-parent="#accordionExample">
                                    <div className="card-body">
                                        <SunEditor hideToolbar={true} defaultValue={item.content}/>
                                    </div>
                                </div>
                            </div>
                        });
                    }
                    this.setState({
                        doctorCheckList: doctorCheckList,
                        appointment: result.data.data,
                        patient: result.data.data.patient,
                        problem: result.data.data.problem,
                        appointmentId: appointmentId
                    });
                    localStorage.setItem("appointment", JSON.stringify(result.data.data));
                    localStorage.setItem("patient", JSON.stringify(result.data.data.patient));
                }
            }
        });

        this.getServices(appointmentId);
    }

    handleChange(content){
        this.setState({content: content});
    }

    getServices(appointmentId) {
        let services = [];
        axios.get(apiHost + '/patient/laboratory/list?appointmentId=' + appointmentId).then(result => {
            if (result.data.statusCode === 200) {
                let index = 0;
                if (result.data.data !== undefined && result.data.data !== null) {
                    let rows = result.data.data.map(row=>{
                        index = index + 1;
                        return <tr key={"s_" + index}><td>{index}</td><td>{row.type.name}</td><td>{row.member !== null ? row.member.name : ''}</td>
                            <td>{strings.laboratory}</td>
                            <td>{row.result !== null && row.result.length > 0 && row.result[0] !== null ? row.result[0].result : ''}</td><td>1</td><td>{row.price}</td><td>{row.paymentStatus.name}</td></tr>
                    });
                    services.push(rows);
                    this.setState({
                        services: services,
                    });
                }
            }
        });
    }

    setValue(e) {
        let name = e.target.id;
        let value = e.target.value;
        if (name === 'diagnosis') {
            this.setState({
                patient: {
                    ...this.state.patient,
                    [name]: value
                }
            })
        } else {
            this.setState({
                patient: {
                    ...this.state.patient,
                    [name]: {
                        id: value
                    }
                }
            })
        }
    }

    save() {
        let user = getUser();
        let data = {};
        data.appointmentId = this.state.appointment.id;
        data.doctor = {
            "id": user.memberId
        };

        data.content = this.state.content;
        axios.post(apiHost + '/appointment/doctorCheckData/add', JSON.stringify(data),
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

    saveServices() {
        this.getServices(this.state.appointmentId);
    }

    showHistory() {
        window.open(window.location.protocol + '//' + window.location.host + "/history", '_self');
    }

    duplicateCheck(appointmentId) {
        let user = getUser();
        axios.get(apiHost + '/appointment/duplicateCheck?appointmentId=' + appointmentId + '&memberId=' + user.memberId)
            .then(result => {
                if (result.data.statusCode === 200) {
                    window.open(apiHost + result.data.data, '_blank');
                } else {
                    swal(result.data.message, "", 'error');
                }
            })
    }

    closeExecServiceModal() {
        this.setState({
            executedService: null,
            serviceExecModalOpen: false
        })
    }

    render() {
        return (
            <div>
                {this.state.appointment.id !== undefined && this.state.appointment.id !== null &&
                <div className="card-body">
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({key})}>
                        <Tab eventKey="home" title={strings.basicInformation}>
                            <div className="card-body my-1">
                                <div className="form-row">
                                    <div className="col-md-10 text-center">
                                        <h4>{strings.patientInformation} &nbsp;<b><u>№{this.state.patient.id}</u></b>&nbsp;&nbsp;
                                            {this.state.appointment.patientType === 'PATIENT_TYPE_STATIONARY' ? <i>({strings.stationaryPatient})</i> :
                                                this.state.appointment.patientType === 'PATIENT_TYPE_PRIVILEGED' ? <i>({strings.privilegedPatient})</i> : ''}</h4>
                                    </div>
                                    <div className="col-md-2 text-right">
                                        <button type="button" className="btn btnBlue"
                                                onClick={this.duplicateCheck.bind(this, this.state.appointment.id)}>Чек</button>
                                    </div>
                                    <div className="col-md-2 text-right">
                                        {(this.state.appointment.paymentStatus.id > 1 && this.state.appointment.purposeType.id === 2) &&
                                        <button type="button" className="btn btnBlue"
                                                onClick={this.showHistory.bind(this)}>{strings.history}</button>
                                        }
                                    </div>
                                </div>
                                <fieldset>
                                    <legend>{strings.basicInformation}</legend>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                            <label htmlFor="lastName">{strings.lastName}</label>
                                            <label
                                                className="form-control">{this.state.patient.lastName}</label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="firstName">{strings.firstName}</label>
                                            <label className="form-control">{this.state.patient.firstName}</label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="middleName">{strings.middleName}</label>
                                            <label className="form-control">{this.state.patient.middleName}</label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="passportNumber">{strings.passportNumber}</label>
                                            <label className="form-control">{this.state.patient.passportNumber}</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phoneNumber">{strings.phoneNumber}</label>
                                            <label className="form-control">{this.state.patient.phoneNumber}</label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <label htmlFor="birthYear">{strings.birthDate}</label>
                                            <label className="form-control"><Moment format="DD.MM.YYYY">{this.state.patient.birthDate}</Moment></label>
                                        </div>
                                        <div className="col-md-3 mb-2">
                                            <label htmlFor="sex">{strings.sex}</label>
                                            <label className="form-control">{this.state.patient.sex.name}</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="address">{strings.address}</label>
                                            <label className="form-control">{this.state.patient.address}</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>{strings.doctorsCheck}</legend>
                                    <div className="accordion" id="accordionExample">
                                        {this.state.doctorCheckList}
                                    </div>
                                </fieldset>
                            </div>
                        </Tab>
                        <Tab eventKey="laboratory" title={strings.laboratoryAnalysis}>
                            <PatientLaboratoryList appointment={this.state.appointment}/>
                        </Tab>
                    </Tabs>
                    <Modal open={this.state.serviceExecModalOpen} onClose={this.closeExecServiceModal.bind(this)} center>
                        <div className="form-row">
                            <div className="col-md-12 text-center mb-3">
                                <b>{this.state.executedService !== null ? this.state.executedService.name : ''}</b>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description">{strings.description}</label>
                                <textarea id="description" cols="3" className="form-control" defaultValue={this.state.executedService !== null ? this.state.executedService.description : ''}/>
                            </div>
                        </div>
                    </Modal>
                </div>
                }
            </div>
        )
    }
}

export default PatientSummaryView;