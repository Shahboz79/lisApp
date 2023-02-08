import React, {Component} from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import {apiHost, getUser, logout, strings} from "./Utils";

class AddDevice extends Component {

    constructor() {
        super();
        const urlParams = new URLSearchParams(window.location.search);
        const deviceId = urlParams.get('id');
        this.state = {
            deviceId: deviceId,
            name: ''
        };
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        if (this.state.deviceId !== undefined && this.state.deviceId !== null && Number(this.state.deviceId) > 0) {
            let user = getUser();
            axios.get(apiHost + '/api/organization/clinicDevice/get?id=' + this.state.deviceId,
                {headers: {Authorization: `Bearer ` + user.token}})
                .then(result => {
                    if (result.status === 200) {
                        if (result.data !== null) {

                            this.setState({
                                name: result.data.name,
                            });
                        }
                    }
                })
        }
    }

    setValue(e) {
        let name = e.target.id;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    save() {
        let user = getUser();
        let deviceId = this.state.deviceId;
        deviceId = (deviceId !== undefined && deviceId !== null && Number(deviceId) > 0 ? deviceId : null);
        let data = {
            "id": deviceId,
            "name": this.state.name};


        axios.post(apiHost + '/api/admin/device/add', data, {headers: {Authorization: `Bearer ` + user.token}})
            .then(result => {
                    if (result.status === 200) {
                        swal(result.data.message, '', 'success');
                    } else if (result.status === 401) {
                        logout();
                    } else {
                        swal(result.data.message, '', 'error');
                    }
                }
            )
    }

    render() {
        return (
            <div className="content">
                <div className="container card card-body shadow-sm">
                    <div className="form-row">
                        <div className="col-md-12 text-center">
                            <h5>{(this.state.deviceId === undefined || this.state.deviceId === null) ? strings.enterDevice : "Курилма маълумотларини таҳрирлаш"}</h5>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <label htmlFor="name">{strings.name}</label>
                            <input id="name" className="form-control" defaultValue={this.state.name}
                                   onChange={this.setValue}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-12 text-center">
                            <button className="btn btnGreen mt-2" onClick={this.save.bind(this)}>{strings.save}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDevice;