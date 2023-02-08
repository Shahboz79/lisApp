import React, {Component} from 'react';
import axios from 'axios';
import {apiHost, getKey, getUser, strings} from "./Utils";

export default class DeviceList extends Component {

    constructor() {
        super();
        let screenHeight = window.screen.height;
        this.state = {
            searchKeyword: '',
            deviceRows: [],
            screenHeight1: screenHeight - 213,
            screenHeight2: screenHeight - 300
        };
        this.search = this.search.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    openAddDeviceView(device) {
        window.open(window.location.protocol + '//' + window.location.host + "/addDevice?id=" + device.id, '_self');
    }

    openAddEmptyDeviceView() {
        window.open(window.location.protocol + '//' + window.location.host + "/addDevice", '_self');
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let user = getUser();
        axios.get(apiHost + '/api/organization/devices',
            { headers: {Authorization: `Bearer ` + user.token} })
            .then(result => {
                let options = [];
                if (result.status === 200) {
                    for (let i = 0; i < result.data.length; i++) {
                        let row = result.data[i];
                        options.push(<tr key={getKey()}>
                            <td>{i + 1}</td>
                            <td className="linkStyle" onClick={this.openAddDeviceView.bind(this, row)}>{row.name}</td>

                        </tr>);
                    }
                }
                this.setState({
                    deviceRows: options
                })
            })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    };

    onChangeValue(e) {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    search() {
        if (this.state.searchKeyword !== '') {
            axios.get(apiHost + '/settings/device/search?keyword=' + this.state.searchKeyword)
                .then(result => {

                    if (result.data.statusCode === 200) {
                        let options = [];
                        if (result.data.data !== null) {
                            for (let i = 0; i < result.data.data.length; i++) {
                                let row = result.data.data[i];
                                options.push(<tr key={getKey()}>
                                    <td>{i + 1}</td>
                                    <td className="linkStyle" onClick={this.openAddDeviceView.bind(this, row)}>{row.type.name}</td>
                                </tr>);
                            }
                        }
                        this.setState({
                            deviceRows: options
                        })
                    } else {
                        this.setState({
                            deviceRows: []
                        })
                    }
                })
        } else {
            this.getData();
        }
    }

    render() {
        return (
            <div className="labaratory">
                <div className="content">
                    <div className="container card card-body">
                        <div className="form-row">
                            <div className="col-md-2">
                                <button className="btn btnGreen" onClick={this.openAddEmptyDeviceView.bind(this)}>
                                    <i className="fa fa-plus-square-o"/>{strings.add}</button>
                            </div>
                            <div className="col-md-6 text-center">
                                <h3>{strings.listOfDevices}</h3>
                            </div>
                            <div className="col-md-4 text-right">
                                <div className="input-group">
                                    <input className="form-control" id="searchBox" placeholder={strings.searchKeyword} aria-label={strings.search} aria-describedby="basic-addon2" type="text" onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}/>
                                    <div className="input-group-append">
                                        <button className="btn btnBlue" id="searchButton" onClick={this.search}>{strings.search}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-12 order-md-1 pt-2 tableScroll" style={{height: this.state.screenHeight2}}>
                                <table id="listTable" className="table table-striped table-bordered shadow">
                                    <thead>
                                    <tr>
                                        <th scope="col">{strings.cage}</th>
                                        <th scope="col">{strings.name}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.deviceRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}