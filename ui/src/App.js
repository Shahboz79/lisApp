import React from "react";
import axios from 'axios';
import swal from 'sweetalert';
import {apiHost, getUser, strings} from "./Utils";
import LoginPage from "./LoginPage";
import AppointmentList from "./AppointmentList";
import PatientList from "./PatientList";
import SettingsView from "./SettingsView";
import {Route, Switch, withRouter} from "react-router-dom";
import PatientSummaryView from "./PatientSummaryView";
import LaboratoryView from "./LaboratoryView";
import LaboratoryHomeView from "./LaboratoryHomeView";
import AdminView from "./AdminView";
import MemberListView from "./MemberListView";
import ReportsView from "./ReportsView";
import AddLaboratoryView from "./AddLaboratoryView";
import LaboratoryListView from "./LaboratoryListView";
import LaborHeadHomeView from "./LaborHeadHomeView";
import AppointmentSummaryView from "./AppointmentSummaryView";
import LaboratoryReportView from "./LaboratoryReportView";
import AllServicesListView from "./AllServicesListView";
import ClinicReportView from "./ClinicReportView";
import LaboratorySettingsView from "./LaboratorySettingsView";
import Header from "./Header";
import DirectorHomeView from "./DirectorHomeView";

import DeviceList from "./DeviceList";
import ClinicDeviceList from "./ClinicDeviceList";
import AddClinicDevice from "./AddClinicDevice";
import AddDevice from "./AddDevice";


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            language: 'uz'
        };
        strings.setLanguage('uz');
    }

    changeLanguage(lang) {
        this.setState({
            language: lang
        });
        strings.setLanguage(lang);
        axios.post(apiHost + '/user/changeLanguage?id=' + getUser().id + '&language=' + lang).then(result=>{
            if (result.data.statusCode === 200) {
                let user = getUser();
                user.language = lang;
                localStorage.setItem('user', JSON.stringify(user));
                swal(result.data.message, '', 'success');
            } else {
                swal(result.data.message, '', 'error');
            }

            window.location.reload();
        })
    }

    render() {
        let user = getUser();
        strings.setLanguage(user !== undefined && user !== null && user.language !== undefined && user.language !== null ? user.language : this.state.language);
        return (
            <div>
                {user !== null && user !== undefined && user.roles !== null &&
                    <Header changeLanguage={this.changeLanguage.bind(this)}/>
                }
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/laboratory">
                        <LaboratoryHomeView/>
                    </Route>
                    <Route path="/deviceList">
                        <DeviceList/>
                    </Route>
                    <Route path="/laboratoryHead">
                        <LaborHeadHomeView/>
                    </Route>
                    <Route path="/laboratoryReport">
                        <LaboratoryReportView/>
                    </Route>
                    <Route path="/laboratorySettings">
                        <LaboratorySettingsView/>
                    </Route>
                    <Route path="/admin">
                        <AdminView/>
                    </Route>
                    <Route path="/director">
                        <DirectorHomeView/>
                    </Route>
                    <Route path="/patients">
                        <PatientList/>
                    </Route>
                    <Route path="/patientView">
                        <PatientSummaryView/>
                    </Route>
                    <Route path="/appointmentAnalyzeItems">
                        <AppointmentList/>
                    </Route>
                    <Route path="/appointmentView">
                        <AppointmentSummaryView/>
                    </Route>
                    <Route path="/laboratoryView">
                        <LaboratoryView/>
                    </Route>
                    <Route path="/settings">
                        <SettingsView/>
                    </Route>
                    <Route path="/members">
                        <MemberListView/>
                    </Route>
                    <Route path="/reports">
                        <ReportsView/>
                    </Route>
                    <Route path="/clinicDeviceList">
                        <ClinicDeviceList/>
                    </Route>
                    <Route path="/addLabView">
                        <AddLaboratoryView/>
                    </Route>
                    <Route path="/addDeviceView">
                        <AddClinicDevice/>
                    </Route>
                    <Route path="/addDevice">
                        <AddDevice/>
                    </Route>
                    <Route path="/laboratoryList">
                        <LaboratoryListView/>
                    </Route>
                    <Route path="/serviceList">
                        <AllServicesListView/>
                    </Route>
                    <Route path="/clinicReports">
                        <ClinicReportView/>
                    </Route>

                </Switch>
            </div>
        )
    }
}

export default withRouter(App);
