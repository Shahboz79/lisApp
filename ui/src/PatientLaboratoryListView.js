import React, {Component} from 'react';
import PatientLaboratoryList from "./PatientLaboratoryList";
import {strings} from "./Utils";

class PatientLaboratoryListView extends Component {

	goBack() {
        window.open(window.location.protocol + '//' + window.location.host + "/patientView", '_self');
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-12 order-md-1 pt-2">
					<PatientLaboratoryList appointmentId={this.props.appointmentId}/>
				</div>
				<div className="col-md-12 order-md-1 pt-2 text-center">
					<button className="btn btnBlue btn-lg col-md-3" type="button" onClick={this.goBack.bind(this)}>{strings.toBack}</button>
				</div>
			</div>
		)
	}
}

export default PatientLaboratoryListView;