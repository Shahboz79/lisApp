import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import swal from 'sweetalert';
import * as _ from './Utils';
import {strings} from './Utils';
import axios from 'axios';
import AddMemberView from "./AddMemberView";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ChangePasswordView from "./ChangePasswordView";
import AddLaboratoryView from "./AddLaboratoryView";
import {getKey} from "./Utils";

class SettingsView extends Component {

    constructor() {
        super();
        this.state = {
            key: 'home',
            user: null,
            serviceName: '',
            servicePrice: 0,
            medicamentName: '',
            medicamentDescription: '',
            medEquipmentName: '',
            medEquipmentPrice: 0,
            serviceRows: [],
            medicamentRows: [],
            medEquipmentRows: [],
            memberRows: [],
            laboratoryRows: [],
            memberModalOpen: false,
            addLaboratoryModalOpen: false,
            addServiceModalOpen: false,
            setPasswordModal: false,
            member: null
        };
        this.saveServices = this.saveServices.bind(this);
        this.saveMedicament = this.saveMedicament.bind(this);
        this.saveMedEquipment = this.saveMedEquipment.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        this.getServiceList();
        this.getMedicamentList();
        this.getMedEquipmentList();
        this.getMemberList();
        this.getLaboratoryList();
    }

    getServiceList() {
        axios.get(_.apiHost + '/settings/service/list3')
            .then(result => {
                if (result.data.statusCode === 200) {
                    let options = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                        let row = result.data.data[i];
                        options.push(<tr key={getKey()}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                        </tr>);
                    }
                    this.setState({
                        serviceRows: options
                    })
                } else {
                    this.setState({
                        serviceRows: []
                    })
                }
            })
    }

    getMedicamentList() {
        axios.get(_.apiHost + '/settings/medicament/list2')
            .then(result => {
                if (result.data.statusCode === 200) {
                    let options = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                        let row = result.data.data[i];
                        options.push(<tr key={"mm_" + row.medicament.id}>
                            <th scope="row">{row.medicament.id}</th>
                            <td>{row.medicament.name}</td>
                            <td>{row.price}</td>
                        </tr>);
                    }
                    this.setState({
                        medicamentRows: options
                    })
                } else {
                    this.setState({
                        medicamentRows: []
                    })
                }
            })
    }

    getMedEquipmentList() {
        axios.get(_.apiHost + '/settings/medEquipment/list2').then(result => {
            if (result.data.statusCode === 200) {
                let options = [];
                for (let i = 0; i < result.data.data.length; i++) {
                    let row = result.data.data[i];
                    options.push(<tr key={"meq_" + row.medicament.id}>
                        <th>{row.medicament.id}</th>
                        <td>{row.medicament.name}</td>
                        <td>{row.price}</td>
                    </tr>);
                }
                this.setState({
                    medEquipmentRows: options
                })
            } else {
                this.setState({
                    medEquipmentRows: []
                })
            }
        })
    }

    getLaboratoryList() {
        axios.get(_.apiHost + '/settings/laboratory/list')
            .then(result => {
                if (result.data.statusCode === 200) {
                    let options = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                        let row = result.data.data[i];
                        options.push(<tr key={"lab_" + row.id}>
                            <th scope="row">{row.id}</th>
                            <td>{row.type.name}</td>
                            <td>{row.price}</td>
                        </tr>);
                    }
                    this.setState({
                        laboratoryRows: options
                    })
                } else {
                    this.setState({
                        laboratoryRows: []
                    })
                }
            })
    }

    openSetPasswordModal(user) {
        this.setState({
            user: user,
            setPasswordModal: true
        })
    }

    closeSetPasswordModal() {
        this.setState({
            setPasswordModal: false
        })
    }

    openAddLaboratoryModal(user) {
        this.setState({
            user: user,
            addLaboratoryModalOpen: true
        })
    }

    closeAddLaboratoryModal() {
        this.setState({
            addLaboratoryModalOpen: false
        })
    }

    openAddServiceModal(member) {
        this.setState({
            member: member,
            addServiceModalOpen: true
        })
    }

    closeAddServiceModal() {
        this.setState({
            addServiceModalOpen: false
        })
    }

    getMemberList() {
        axios.get(_.apiHost + '/member/list')
            .then(result => {
                if (result.data.statusCode === 200) {
                    let options = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                        let row = result.data.data[i];
                        options.push(<tr key={"mr_" + row.id}>
                            <td>{row.id}</td>
                            <td>{row.lastName}</td>
                            <td>{row.firstName}</td>
                            <td>{row.middleName}</td>
                            <td>{row.position !== null ? row.position.name : ''}</td>
                            <td>
                                <button className="btn icon" title={strings.edit}
                                        onClick={this.openModal.bind(this, row)}><i className="fa fa-edit"/>
                                </button>
                                <button className="btn icon ml-1" title={strings.changePassword}
                                        onClick={this.openSetPasswordModal.bind(this, row)}><i className="fa fa-vcard"/>
                                </button>
                                <button className="btn icon ml-1" title={strings.enterService}
                                        onClick={this.openAddServiceModal.bind(this, row)}><i className="fa fa-list"/>
                                </button>
                            </td>
                        </tr>);
                    }
                    this.setState({
                        memberRows: options
                    })
                } else {
                    this.setState({
                        memberRows: []
                    })
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

    saveServices() {
        let data = {};
        data.name = this.state.serviceName;
        data.price = this.state.servicePrice;
        data.description = 'service';
        axios.post(_.apiHost + '/settings/service/add', data).then(result => {
            if (result.data.statusCode === 200) {
                swal(result.data.message, "", 'success');
                this.setState({
                    serviceName: '',
                    servicePrice: 0
                });
                this.getServiceList();
            } else {
                swal(result.data.message, "", 'error');
            }
        })
    }

    saveMedicament() {
        axios.post(_.apiHost + '/settings/medicament/add?name=' + this.state.medicamentName +
            '&description=' + this.state.medicamentDescription)
            .then(result => {
                if (result.data.statusCode === 200) {
                    swal(result.data.message, "", 'success');
                    this.setState({
                        medicamentName: '',
                        medicamentDescription: ''
                    });
                    this.getMedicamentList();
                } else {
                    swal(result.data.message, "", 'error');
                }
            })
    }

    saveMedEquipment() {
        axios.post(_.apiHost + '/settings/medEquipment/add?name=' + this.state.medEquipmentName + '&price=' + this.state.medEquipmentPrice)
            .then(result => {
                if (result.data.statusCode === 200) {
                    swal(result.data.message, "", 'success');
                    this.setState({
                        medicamentName: '',
                        medicamentDescription: ''
                    });
                    this.getMedicamentList();
                } else {
                    swal(result.data.message, "", 'error');
                }
            })
    }

    openModal(member) {
        this.setState({
            member: member,
            memberModalOpen: true
        })
    }

    closeModal() {
        this.setState({
            member: null,
            memberModalOpen: false
        })
    }

    render() {
        return (
            <div className="settings">
                <div className="content">
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({key})}>
                        <Tab eventKey="medEquipment" title="Тиббий анжомлар">
                            <div className="container card card-body my-4">
                                <div className="row">
                                    <div className="col-md-12 order-md-1">
                                        <div className="col-md-12 text-center">
                                            <h4>{strings.medicalEquipment}</h4>
                                        </div>
                                        <form className="needs-validation">
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" id="medEquipmentName"
                                                           placeholder={strings.name1} onChange={this.setValue}/>
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="number" className="form-control" id="medEquipmentPrice"
                                                           placeholder={strings.price} onChange={this.setValue}/>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn btnGreen form-control" type="button"
                                                            onClick={this.saveMedEquipment}>{strings.save}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="tableScroll w-100">
                                            <table className="table table-striped table-bordered shadow">
                                                <thead>
                                                <tr>
                                                    <th scope="col">{strings.cage}</th>
                                                    <th scope="col">{strings.name1}</th>
                                                    <th scope="col">{strings.price}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.medEquipmentRows}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="medicament" title="Дорилар">
                            <div className="container card card-body my-4">
                                <div className="row">
                                    <div className="col-md-12 order-md-1">
                                        <div className="col-md-12 text-center">
                                            <h4>{strings.medicaments}</h4>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-9">
                                                <input type="text" className="form-control" id="medicamentName"
                                                       placeholder={strings.name1} onChange={this.setValue}/>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btnGreen form-control" type="button"
                                                        onClick={this.saveMedicament}>{strings.save}
                                                </button>
                                            </div>
                                    </div>
                                        <div className="tableScroll w-100">
                                            <table className="table table-striped table-bordered shadow">
                                                <thead>
                                                <tr>
                                                    <th scope="col">{strings.cage}</th>
                                                    <th scope="col">{strings.name1}</th>
                                                    <th scope="col">{strings.price}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.medicamentRows}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="home" title="Хизмат турлари">
                            <div className="container card card-body my-4">
                                <div className="row">
                                    <div className="col-md-12 order-md-1">
                                        <div className="col-md-12 text-center">
                                            <h4>{strings.enterService}</h4>
                                        </div>
                                        <form className="needs-validation">
                                            <div className="row mb-3">
                                                <div className="col-md-8">
                                                    <input className="form-control" id="serviceName"
                                                           placeholder={strings.name1} onChange={this.setValue}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <input type="number" className="form-control" id="servicePrice"
                                                           placeholder={strings.price} onChange={this.setValue}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <button className="btn btnGreen form-control" type="button"
                                                            onClick={this.saveServices}>{strings.save}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="tableScroll w-100">
                                            <table className="table table-striped  table-bordered shadow">
                                                <thead>
                                                <tr>
                                                    <th scope="col">{strings.cage}</th>
                                                    <th scope="col">{strings.name1}</th>
                                                    <th scope="col">{strings.price}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.serviceRows}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="labs" title={strings.laboratories}>
                            <div className="container card card-body my-4 ">
                                <div className="form-row">
                                    <div className="col-md-9 text-center">
                                        <h4>{strings.laboratoryAnalysis}</h4>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <button className="btn btnBlue"
                                                onClick={this.openAddLaboratoryModal.bind(this)}>{strings.addLabAnalysis}</button>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <Modal open={this.state.addLaboratoryModalOpen}
                                           onClose={this.closeAddLaboratoryModal.bind(this)} center>
                                        <AddLaboratoryView/>
                                    </Modal>
                                    <div className="tableScroll w-100">
                                        <table className="table table-striped table-bordered shadow">
                                            <thead>
                                            <tr>
                                                <th scope="col">{strings.cage}</th>
                                                <th scope="col">{strings.name1}</th>
                                                <th scope="col">{strings.price}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.laboratoryRows}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="members" title={strings.members2}>
                            <div className="container card card-body my-4">
                                <div className="form-row">
                                    <div className="col-md-10 text-center">
                                        <h4>{strings.employeeInformation}</h4>
                                    </div>
                                    <div className="col-md-2 text-right">
                                        <button className="btn btnBlue"
                                                onClick={this.openModal.bind(this)}>{strings.addEmployee}</button>
                                    </div>
                                </div>
                                <div className="form-row mt-3">
                                    <Modal open={this.state.memberModalOpen} onClose={this.closeModal.bind(this)}
                                           center>
                                        <AddMemberView member={this.state.member} getMemberList={this.getMemberList.bind(this)}/>
                                    </Modal>
                                    <Modal open={this.state.setPasswordModal}
                                           onClose={this.closeSetPasswordModal.bind(this)} center>
                                        <ChangePasswordView user={this.state.user}/>
                                    </Modal>
                                    <div className="tableScroll w-100">
                                        <table className="table table-striped table-bordered shadow ">
                                            <thead>
                                            <tr>
                                                <th scope="col">{strings.cage}</th>
                                                <th scope="col">{strings.lastName}</th>
                                                <th scope="col">{strings.firstName}</th>
                                                <th scope="col">{strings.thirdName}</th>
                                                <th scope="col">{strings.position}</th>
                                                <th scope="col">{strings.action}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.memberRows}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default SettingsView;