import React, {Component} from 'react';
import axios from 'axios';
import {apiHost, strings} from './Utils';
import {Tab, Tabs} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class AppointmentSummaryView extends Component {

    constructor() {
        super();
        const urlParams = new URLSearchParams(window.location.search);
        const appointmentId = urlParams.get('id');
        this.state = {
            key: 'home',
            appointment: null,
            appointmentId: appointmentId,
            tableRows: [],
        };
    }

    componentDidMount() {
        axios.get(apiHost + '/appointment/get?id=' + this.state.appointmentId)
            .then(result => {
                if (result.data.statusCode === 200) {
                    if (result.data.data !== undefined && result.data.data !== null) {
                        this.setState({
                            appointment: result.data.data
                        });
                    }
                }
            });
    }

    render() {
        let appointment = this.state.appointment;
        return (
            <div className="content">
                {appointment !== null &&
                <div className="container card card-body my-4">
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({key})}>
                        <Tab eventKey="home" title="Асосий маълумотлар">
                            <div className="row">
                                <div className="col-md-12 mb-3 text-center">
                                    <h3>{strings.admissionInformation}</h3>
                                </div>
                                <div className="col-md-12 order-md-1">
                                    <form className="needs-validation">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="patient">{strings.patient}</label>
                                                <label className="form-control"
                                                       id="patient">{appointment.patient !== undefined && appointment.patient !== null ? (appointment.patient.lastName + ' ' + appointment.patient.firstName) : ''}</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="member">{strings.doctor}</label>
                                                <label className="form-control"
                                                       id="member">{appointment.member !== undefined && appointment.member !== null ? ((appointment.member.lastName !== null ? appointment.member.lastName : '') + ' ' + (appointment.member.firstName !== null ? appointment.member.firstName : '')) : ''}</label>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="problem">{strings.problem}</label>
                                            <label className="form-control" id="problem">{appointment.problem}</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(AppointmentSummaryView);