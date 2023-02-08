import React, {Component} from 'react';
import {checkUserRole} from './Utils';
import PatientList from "./PatientList";

export default class DirectorHomeView extends Component {
    render() {
        checkUserRole('DIRECTOR');
        return (
            <div className="form-row">
                <div className="col-md-12">
                    <PatientList/>
                </div>
            </div>
        )
    }
}