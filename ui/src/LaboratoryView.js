import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import * as _ from './Utils';
import {getUser, isLaboratory, strings} from './Utils';
import {isHeadOfLaboratory} from "./Utils";

export default class LaboratoryView extends Component {

    constructor(props) {
        super(props);
        let user = getUser();
        const appointmentLaboratoryId = localStorage.getItem('appointmentLaboratoryId');
        this.state = {
            user: user,
            tableRows: [],
            laboratoryItemRows: [],
            analyzeType: '',
            analyzeValue: '',
            hasEditAccess: false,
            appointmentLaboratoryId: appointmentLaboratoryId,
            deviceValue: ''
        };
        this.setValue = this.setValue.bind(this);
        this.saveLaboratory = this.saveLaboratory.bind(this);
    }

    componentDidMount() {
        this.getLaboratoryList();
    }

    getLaboratoryList() {
        axios.get(_.apiHost + '/appointment/laboratory/item/list?appointmentLaboratoryId=' + this.state.appointmentLaboratoryId)
            .then(result => {
                if (result.data.statusCode === 200) {
                    let options = [];
                    let lineItems = [];
                    let hasEditAccess = false;
                    if (result.data.data !== undefined && result.data.data !== null) {
                        for (let i = 0; i < result.data.data.length; i++) {
                            let row = result.data.data[i];
                            if (isHeadOfLaboratory(this.state.user) || (isLaboratory(this.state.user) && (row.result === undefined || row.result === null || row.result === ''))) {
                                hasEditAccess = true;
                            }
                            options.push(<tr key={'tr_' + row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{(isHeadOfLaboratory(this.state.user) || hasEditAccess) ?
                                    <input id={'r_' + row.id} key={'r_' + row.id} className="form-control"
                                           defaultValue={row.result || this.state.deviceValue}/> : row.result}</td>
                                <td>{row.normative}</td>
                            </tr>);


                            lineItems.push(row.id)
                        }
                        this.setState({
                            tableRows: options,
                            laboratoryItemRows: lineItems,
                            hasEditAccess: hasEditAccess
                        })
                    }
                }
            });
    }

    goBack() {
        localStorage.setItem('patientViewTab', 'laboratory');
        window.open(window.location.protocol + '//' + window.location.host + '/patientView', '_self');
    }

    setValue(e) {
        let name = e.target.id;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    saveLaboratory() {
        let items = this.state.laboratoryItemRows.map(row => {
            let result = document.getElementById('r_' + row).value;
            return {
                "laboratoryItemId": row,
                "result": result
            }
        });
        let formData = {
            "id": this.state.appointmentLaboratoryId,
            "member": {
                "id": this.state.user.id
            },
            "result": items
        };
        axios.post(_.apiHost + '/patient/laboratory/item/add', formData)
            .then(result => {
                if (result.data.statusCode === 200) {
                    swal(result.data.message, "", 'success');
                    this.getLaboratoryList();
                } else {
                    swal(result.data.message, "", 'error');
                }
            });
    }

    copyValue() {
        let deviceValue = document.getElementById('deviceValue').value;
        if (deviceValue !== undefined && deviceValue !== null && deviceValue !== '') {
            axios.get(_.apiHost + '/laboratory/item/setValue?deviceValue=' + deviceValue)
                .then(result => {
                    if (result.data.statusCode === 200) {
                        this.setState({
                            deviceValue: result.data.data
                        });
                        swal(result.data.message, "", 'success');
                    } else {
                        swal(result.data.message, "", 'error');
                    }
                });
        }
    }

    render() {
        let appointment = this.state.appointment;
        return (
            <div className="labaratory">
                <div className="content">
                    {appointment !== null &&
                    <div className="container card card-body">
                        <div className="row">
                            <div className="col-md-12 order-md-1 pt-2 ">
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table className="table table-striped table-bordered shadow mb-0">
                                        <thead>
                                        <tr>
                                            <th scope="col">{strings.cage}</th>
                                            <th scope="col">{strings.name1}</th>
                                            <th scope="col">{strings.result}</th>
                                            <th scope="col">{strings.standard}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.tableRows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-11 pt-2">
                                <textarea id="deviceValue" cols="3" className="form-control"></textarea>
                            </div>
                            <div className="col-md-1 pt-2">
                                <button className="btn btn-info" onClick={this.copyValue.bind(this)}>Кўчириш</button>
                            </div>
                        </div>
                        {(isLaboratory(this.state.user) || isHeadOfLaboratory(this.state.user)) && this.state.hasEditAccess &&
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <button className="btn btnGreen btn-lg col-md-3" type="button"
                                        onClick={this.saveLaboratory}>{strings.save}</button>
                            </div>
                        </div>
                        }
                        <div className="row">
                            <div className="col-md-12 order-md-1 pt-2 text-center">
                                <button className="btn btnBlue btn-lg col-md-3" type="button"
                                        onClick={this.goBack.bind(this)}>{strings.toBack}</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}