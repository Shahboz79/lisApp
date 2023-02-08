import React, {Component} from "react";
import axios from "axios";
import * as _ from "./Utils";
import {Tab, Tabs} from "react-bootstrap";
import NumberFormat from "react-number-format";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ReportsView extends Component {

    constructor() {
        super();
        this.state = {
            memberRows: [],
            tabListKey: 'population',
            laboratoryTableRows: [],
            laboratory2TableRows: [],
            servicesTableRows: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        }
    }

    componentDidMount() {
        axios.get(_.apiHost + '/member/list').then(result => {
            let options = [];
            if (result.data.statusCode === 200) {
                options = result.data.data.map(row=>{
                    return <tr><td>{row.id}</td><td>{row.lastName + ' ' + row.firstName}</td><td>{row.position.name}</td></tr>;
                });
            }
            this.setState({
                memberRows: options
            })
        });
        this.getLaboratoryReport();
        this.getLaboratoryReport2();
        this.getServicesReport();
    }

    getLaboratoryReport() {
        axios.get(_.apiHost + '/report/laboratory/accounting/report?month=' + this.state.month).then(result=>{
            if (result.data.statusCode === 200) {
                let items = result.data.data.map(row=>{
                    let sum1 = 0, sum2 = 0;
                    let rowItems = row.items.map(item=> {
                        sum1 = sum1 + Number(item.counts[0]);
                        sum2 = sum2 + Number(item.counts[1]);
                        return <tr>
                            <td>{item.name}</td>
                            <td>{item.counts[0]}</td>
                            <td>{item.counts[1]}</td>
                        </tr>;
                    });
                    rowItems.push(<tr className="font-weight-bold"><td>{_.strings.summaryNumbers}</td><td>{sum1}</td><td>{sum2}</td></tr>);
                    return <div><h5>{row.laboratoryName}</h5><table className="table table-striped table-bordered shadow">
                        <thead>
                        <tr>
                            <th scope="col">{_.strings.name}</th>
                            <th scope="col">{_.strings.amountLimit}</th>
                            <th scope="col">{_.strings.amount}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rowItems}
                        </tbody>
                    </table></div>;
                });

                this.setState({
                    laboratoryTableRows: items
                })
            }
        })
    }

    getLaboratoryReport2() {
        axios.get(_.apiHost + '/report/laboratory/report').then(result=>{
            if (result.data.statusCode === 200) {
                let paramsSum = [0,0,0,0,0,0,0,0,0];
                let items = result.data.data.map(row => {
                    paramsSum[0] += row.param1;
                    paramsSum[1] += row.param2;
                    paramsSum[2] += row.param3;
                    paramsSum[3] += row.param4;
                    paramsSum[4] += row.param5;
                    paramsSum[5] += row.param6;
                    paramsSum[6] += row.param1+row.param4;
                    paramsSum[7] += +row.param2+row.param5;
                    paramsSum[8] += +row.param3+row.param6;
                    return <tr><td>{row.monthName}</td>
                        <td>{row.param1}</td><td>{row.param2}</td><td><NumberFormat value={row.param3} thousandSeparator=" " displayType={'text'}/></td><td>{row.param4}</td><td>{row.param5}</td>
                        <td><NumberFormat value={row.param6} thousandSeparator=" " displayType={'text'}/></td>
                        <td>{row.param1 + row.param4}</td><td>{row.param2+row.param5}</td><td><NumberFormat value={row.param3+row.param6} thousandSeparator=" " displayType={'text'}/></td>
                    </tr>
                });
                items.push(<tr><td className="table-header"><b>Жами:</b></td>
                    <td className="table-header">{paramsSum[0]}</td><td className="table-header">{paramsSum[1]}</td><td className="table-header"><NumberFormat value={paramsSum[2]} thousandSeparator=" " displayType={'text'}/></td>
                    <td className="table-header">{paramsSum[3]}</td><td className="table-header">{paramsSum[4]}</td><td className="table-header"><NumberFormat value={paramsSum[5]} thousandSeparator=" " displayType={'text'}/></td>
                    <td className="table-header"><NumberFormat value={paramsSum[6]} thousandSeparator=" " displayType={'text'}/></td><td className="table-header">{paramsSum[7]}</td><td className="table-header"><NumberFormat value={paramsSum[8]} thousandSeparator=" " displayType={'text'}/></td></tr>);

                this.setState({
                    laboratory2TableRows: items
                })
            }
        })
    }

    getServicesReport() {
        axios.get(_.apiHost + '/report/services/accounting/report?month=' + this.state.month).then(result=>{
            if (result.data.statusCode === 200) {
                let items = result.data.data.map(row=>{
                    let sum1 = 0, sum2 = 0;
                    let rowItems = row.items.map(item=> {
                        sum1 = sum1 + Number(item.counts[0]);
                        sum2 = sum2 + Number(item.counts[1]);
                        return <tr>
                            <td>{item.name}</td>
                            <td>{item.counts[0]}</td>
                            <td>{item.counts[1]}</td>
                        </tr>;
                    });
                    rowItems.push(<tr className="font-weight-bold"><td>{_.strings.summaryNumbers}</td><td>{sum1}</td><td>{sum2}</td></tr>);
                    return <div><h5>{row.laboratoryName}</h5><table className="table table-striped table-bordered shadow">
                        <thead>
                        <tr>
                            <th scope="col">{_.strings.name}</th>
                            <th scope="col">{_.strings.amountLimit}</th>
                            <th scope="col">{_.strings.amount}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rowItems}
                        </tbody>
                    </table></div>;
                });

                this.setState({
                    servicesTableRows: items
                })
            }
        })
    }

    exportLaboratoriesToExcel() {
        cookies.set('month', this.state.month, {path: '/'});
        let form = document.getElementById("laboratoryExcelForm");
        form.submit();
    }

    exportServicesToExcel() {
        cookies.set('month', this.state.month, {path: '/'});
        let form = document.getElementById("servicesExcelForm");
        form.submit();
    }

    render() {
        return (
            <div className="reports">
                <div className="content">
                    <div className="card card-body tableScroll">
                        <Tabs id="controlled-tab-example" activeKey={this.state.tabListKey}
                              onSelect={key => this.setState({tabListKey: key})}>

                            <Tab eventKey="laboratory" title="Лаборатория">
                                <table id="adminReport6" className="w-100">
                                    <thead>
                                    <tr>
                                        <td className="table-header" rowSpan={3}>&nbsp;</td>
                                        <td className="table-header" colSpan={3}><p>{_.strings.athletes}</p></td>
                                        <td className="table-header" colSpan={3}><p>{_.strings.popular}</p></td>
                                        <td className="table-header" colSpan={3}><p>{_.strings.inTotal}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="table-header" rowSpan={2}><p>{_.strings.analysesNumber}</p></td>
                                        <td className="table-header" colSpan={2}><p>{_.strings.checksNumber}</p></td>
                                        <td className="table-header" rowSpan={2}><p>{_.strings.analysesNumber}</p></td>
                                        <td className="table-header" colSpan={2}><p>{_.strings.checksNumber}</p></td>
                                        <td className="table-header" rowSpan={2}><p>{_.strings.analysesNumber}</p></td>
                                        <td className="table-header" colSpan={2}><p>{_.strings.checksNumber}</p></td>
                                    </tr>
                                    <tr>
                                        <td className="table-header"><p>{_.strings.quantity}</p></td>
                                        <td className="table-header"><p>{_.strings.price}</p></td>
                                        <td className="table-header"><p>{_.strings.quantity}</p></td>
                                        <td className="table-header"><p>{_.strings.price}</p></td>
                                        <td className="table-header"><p>{_.strings.quantity}</p></td>
                                        <td className="table-header"><p>{_.strings.price}</p></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.laboratory2TableRows}
                                    </tbody>
                                </table>
                            </Tab>
                            <Tab eventKey="laboratory2" title="Лабораториялар">
                                <div className="col-md-12 pt-2 p-0">
                                    <h4 className="text-center mb-5">{this.state.year} йил {_.getMonthName(this.state.month)} ойида Республика Спорт Тиббиёти илмий-амалий маркази томонидан бажарилган лаборатория текширувлари ҳақида маълумот</h4>
                                    <div className="form-row">
                                        <div className="col-md-12 text-right">
                                            <form id="laboratoryExcelForm" method="post" className="ml-1"
                                                  action={_.apiHost + "/common/laboratoryReportPDF"}>
                                                <button className="btn btnBlue" onClick={this.exportLaboratoriesToExcel.bind(this)}>
                                                    <i className="btnBlue fa fa-file-pdf-o"/>{_.strings.exportToExcel}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {this.state.laboratoryTableRows}
                                </div>
                            </Tab>
                            <Tab eventKey="services" title="Хизматлар">
                                <div className="col-md-12 pt-2 tableScroll w-100 p-0">
                                    <h4 className="text-center">{this.state.year} йил {_.getMonthName(this.state.month)} ойида Республика Спорт Тиббиёти илмий-амалий маркази томонидан кўрсатилган хизматлар ҳақида маълумот</h4>
                                    <div className="form-row">
                                        <div className="col-md-12 text-right">
                                            <form id="servicesExcelForm" method="post" className="ml-1"
                                                  action={_.apiHost + "/common/serviceReportPDF"}>
                                                <button className="btn btnBlue" onClick={this.exportServicesToExcel.bind(this)}>
                                                    <i className="btnBlue fa fa-file-pdf-o"/>{_.strings.exportToExcel}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {this.state.servicesTableRows}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportsView;