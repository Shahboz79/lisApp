import React from 'react';
import axios from 'axios';
import {apiHost, strings} from './Utils';
import Moment from 'react-moment';

class AppointmentList extends React.Component {

    constructor() {
        super();
        this.state = {
            tableRows: []
        };
    }

    componentDidMount() {
        axios.get(apiHost + '/appointment/list')
            .then(result => {
                if (result.data.statusCode === 200) {
                    let options = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                        let row = result.data.data[i];
                        options.push(<tr>
                            <th scope="row">{row.id}</th>
                            <td><a href={"/appointmentView?id=" + row.id}>{row.patient.lastName}</a></td>
                            <td><a href={"/appointmentView?id=" + row.id}>{row.patient.firstName}</a></td>
                            <td>{row.startDate !== null ? <Moment format="DD.MM.YYYY HH:mm">{row.startDate}</Moment> :
                                <span>&nbsp;</span>}</td>
                            <td>{(row.member.lastName !== null ? row.member.lastName : '') + ' ' + (row.member.firstName !== null ? row.member.firstName : '')}</td>
                            <td>{row.duration !== null ? row.duration + ' kun' : ''}</td>
                            <td>{row.status.name}</td>
                        </tr>);
                    }
                    this.setState({
                        tableRows: options
                    })
                } else {
                    this.setState({
                        tableRows: []
                    })
                }
            })
    }

    render() {
        return (
            <div className="content">
                <div className="container card card-body shadow-sm">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3>{strings.appointmentList}</h3>
                        </div>
                        <div className="col-md-12 order-md-1 pt-2">
                            <table className="table table-striped table-bordered shadow">
                                <thead>
                                <tr>
                                    <th scope="col">{strings.lastName}</th>
                                    <th scope="col">{strings.firstName1}</th>
                                    <th scope="col">{strings.startTime}</th>
                                    <th scope="col">{strings.doctor}</th>
                                    <th scope="col">{strings.duration}</th>
                                    <th scope="col">{strings.condition1}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppointmentList;