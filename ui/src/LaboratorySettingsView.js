import React, {Component} from 'react';
import {apiHost, strings} from "./Utils";
import axios from 'axios';
import swal from 'sweetalert';

export default class LaboratorySettingsView extends Component {

    constructor() {
        super();
        this.state = {
            options: [],
            blankType: 'PLEASE_SELECT',
            blankTitle: '',
            blankSigner: ''
        };
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        axios.get(apiHost + '/settings/laboratory/blankTypes').then(result=>{
            if (result.data.statusCode === 200) {
                let rows = result.data.data.map(row=>{
                    return <option value={row.code}>{row.name}</option>
                });
                this.setState({
                    options: rows
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

    onChangeType(e) {
        this.setValue(e);
        let type = e.target.value;
        axios.get(apiHost + '/settings/laboratory/settings/get?type=' + type).then(result=>{
            if (result.data.statusCode === 200) {
                this.setState({
                    blankTitle: result.data.data.blankTitle,
                    blankSigner: result.data.data.blankSigner,
                });
                swal(result.data.message, '', 'success');
            } else {
                swal(result.data.message, '', 'success');
            }
        })
    }

    saveSettings() {
        if (this.state.blankType === '' || this.state.blankType === 'PLEASE_SELECT') {
            swal('Бланка турини танланг', '', 'error');
            return;
        }
        if (this.state.blankTitle === '') {
            swal('Бланка сарлавҳасини киритинг', '', 'error');
            return;
        }
        if (this.state.blankSigner === '') {
            swal('Имзо қўювчини киритинг', '', 'error');
            return;
        }

        let data = {};
        data.blankType = this.state.blankType;
        data.blankTitle = this.state.blankTitle;
        data.blankSigner = this.state.blankSigner;
        axios.post(apiHost + '/settings/laboratory/settings/save', data).then(result=>{
            if (result.data.statusCode === 200) {
                swal(result.data.message, '', 'success');
            } else {
                swal(result.data.message, '', 'error');
            }
        })
    }

    render() {
        return (
            <div className="content">
                <div className="container card card-body shadow-sm">
                    <div className="form-row">
                        <div className="col-md-4">
                            <label htmlFor="blankType">Бланка номи</label>
                            <select id="blankType" className="form-control" onChange={this.onChangeType.bind(this)}>
                                {this.state.options}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="blankTitle">Бланка сарлавҳаси</label>
                            <input id="blankTitle" className="form-control" defaultValue={this.state.blankTitle} onChange={this.setValue}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="blankSigner">Имзо қўювчи</label>
                            <input id="blankSigner" className="form-control" defaultValue={this.state.blankSigner} onChange={this.setValue}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mt-2 text-center">
                            <button className="btn btn-success" onClick={this.saveSettings.bind(this)}>{strings.save}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}