import React, {Component} from 'react';
import {checkUserRole} from "./Utils";
import ClinicListView from "./ClinicListView";

class AdminView extends Component {

	render() {
        checkUserRole('ADMIN');
		return (
			<div>
				<ClinicListView/>
			</div>
		)
	}
}

export default AdminView;