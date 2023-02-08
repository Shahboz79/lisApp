import React, {Component} from 'react';
import {apiHost} from "./Utils";
import axios from 'axios';

export default class LaboratoryReportView extends Component {

    constructor() {
        super();
        this.state = {
            tableRows: []
        }
    }

    componentDidMount() {
        axios.get(apiHost + '/report/laboratory/monthlyReport').then(result=>{
            if (result.data.statusCode === 200) {
                let summary = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                let tableRows = result.data.data.map(row=>{
                    for (let i=0; i<16; i++) {
                        summary[i] += row.counts[i];
                    }
                    return <tr><td>{row.name}</td>
                        <td>{row.counts[0]}</td>
                        <td>{row.counts[1]}</td>
                        <td>{row.counts[2]}</td>
                        <td>{row.counts[3]}</td>
                        <td>{row.counts[4]}</td>
                        <td>{row.counts[5]}</td>
                        <td>{row.counts[6]}</td>
                        <td>{row.counts[7]}</td>

                        <td>{row.counts[8]}</td>
                        <td>{row.counts[9]}</td>
                        <td>{row.counts[10]}</td>
                        <td>{row.counts[11]}</td>
                        <td>{row.counts[12]}</td>
                        <td>{row.counts[13]}</td>
                        <td>{row.counts[14]}</td>
                        <td>{row.counts[15]}</td>
                    </tr>;
                });
                tableRows.push(<tr><td>Жами:</td>
                    <td>{summary[0]}</td>
                    <td>{summary[1]}</td>
                    <td>{summary[2]}</td>
                    <td>{summary[3]}</td>
                    <td>{summary[4]}</td>
                    <td>{summary[5]}</td>
                    <td>{summary[6]}</td>
                    <td>{summary[7]}</td>

                    <td>{summary[8]}</td>
                    <td>{summary[9]}</td>
                    <td>{summary[10]}</td>
                    <td>{summary[11]}</td>
                    <td>{summary[12]}</td>
                    <td>{summary[13]}</td>
                    <td>{summary[14]}</td>
                    <td>{summary[15]}</td>
                </tr>);
                this.setState({
                    tableRows: tableRows
                })
            }
        })
    }

    render() {
        return (
            <div className="labaratory content">
                <div className="card card-body shadow-sm">
                    <div className="form-row">
                        <div className="col-md-12 text-center">
                            <h4>Лаборатория томонидан апрель ойида ўтказилган шахслар ва таҳлиллар бўйича <br/> ҲИСОБОТ</h4>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12" style={{overflowX: "auto"}}>
                            <table className="table table-striped table-bordered shadow">
                                <thead>
                                <tr>
                                    <th rowspan="2">Кўрсаткичлар номи</th>
                                    <th colspan="8">Шахслар</th>
                                    <th colspan="8">Таҳлиллар</th>
                                </tr>
                                <tr>
                                    <th>Жами</th>
                                    <th>Умумий клиник</th>
                                    <th>Гемотологик</th>
                                    <th>Гемостаз</th>
                                    <th>Биокимё</th>
                                    <th>Генетика</th>
                                    <th>Микробиология</th>
                                    <th>Иммунология</th>

                                    <th>Жами</th>
                                    <th>Умумий клиник</th>
                                    <th>Гемотологик</th>
                                    <th>Гемостаз</th>
                                    <th>Биокимё</th>
                                    <th>Генетика</th>
                                    <th>Микробиология</th>
                                    <th>Иммунология</th>
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