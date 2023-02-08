import React, {Component} from 'react';
import {checkUserRole} from './Utils';
import PatientList from "./PatientList";

export default class LaboratoryHomeView extends Component {

    openView(patientId) {
        localStorage.setItem('patientId', patientId);
        window.open(window.location.protocol + '//' + window.location.host + "/plListView", '_self');
    }

    render() {
        checkUserRole('DOCTOR_LABORANT');
        return (
            <div className="form-row">
                <div className="col-md-12">
                    <PatientList/>
                </div>
            </div>
        )
    }
}