import React, {Component} from 'react';
import {apiHost, getMonthDatesCount, getUser, strings} from "./Utils";
import Moment from 'react-moment';
import 'moment/locale/uz';
import axios from 'axios';

export default class ClinicReportView extends Component {

    constructor() {
        super();
        this.state = {
            tableRows: []
        }
    }

    componentDidMount() {
        let user = getUser();
        let currentDate = new Date();
        let tableRows = [];
        let all=0, allSportsmanCount = 0, allPopulationCount1 = 0, population18YearsCount1 = 0, populationAmount1 = 0,
            population18YearsCount2 = 0, allInsurance1 = 0, insuranceAmount1 = 0;
        axios.get(apiHost + '/report/doctors/dailyReport?memberId=' + user.memberId + '&month=' + currentDate.getMonth()).then(result=>{
           if (result.data.statusCode === 200) {
               tableRows = result.data.data.map(row=> {
                   allSportsmanCount = allSportsmanCount + row.sportsmanCount;
                   allPopulationCount1 = allPopulationCount1 + row.allPopulationCount1;
                   population18YearsCount1 = population18YearsCount1 + row.population18YearsCount1;
                   populationAmount1 = populationAmount1 + row.populationAmount1;
                   insuranceAmount1 = insuranceAmount1 + row.insuranceAmount1;
                   population18YearsCount2 = population18YearsCount2 + row.population18YearsCount2;
                   allInsurance1 = allInsurance1 + row.allInsuranceCount1;
                   all = allSportsmanCount + allPopulationCount1 + allInsurance1;
                   return <tr><td>{row.date}</td><td>{row.sportsmanCount + row.populationCount + row.agreementCount}</td>
                       <td>{row.sportsmanCount}</td><td>{row.allPopulationCount1}</td>
                       <td>{row.agreementCount}</td>
                       <td>0</td><td>0</td><td>{row.allPopulationCount1}</td><td>{row.population18YearsCount1}</td><td>{row.populationAmount1}</td>
                       <td>{row.allInsuranceCount1}</td><td>{row.insurance18YearsCount1}</td><td>{row.insuranceAmount1}</td><td>0</td><td>0</td></tr>
               });
               tableRows.push(<tr style={{fontWeight: "bold"}}>
                   <td>{strings.summaryNumbers}</td><td>{all}</td><td>{allSportsmanCount}</td>
                   <td>{allPopulationCount1}</td><td>{allInsurance1}</td>
                   <td>0</td><td>0</td>
                   <td>{allPopulationCount1}</td><td>{population18YearsCount1}</td><td>{populationAmount1}</td>
                   <td>{allInsurance1}</td><td>0</td><td>{insuranceAmount1}</td><td>0</td><td>0</td></tr>);
               this.setState({
                   tableRows: tableRows
               })
           } else {
               let daysCount = getMonthDatesCount();
               for (let i=0; i<daysCount; i++) {
                   tableRows.push(<tr><td>{i+1}</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                       <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>)
               }
               tableRows.push(<tr style={{fontWeight: "bold"}}><td>{strings.summaryNumbers}</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                   <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>);
               this.setState({
                   tableRows: tableRows
               })
           }
        });
    }

    render() {
        let user = getUser();
        return (
            <div className="ml-1 mr-1">
                <div className="form-row">
                    <div className="col-md-12 text-center mt-4">
                        <h5>Шифокорларга қатновларни қайдлов</h5>
                        <h4>БИЛДИРИШНОМАСИ</h4>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6">
                        <h5>Врач: {user.lastName + ' ' + user.firstName}</h5>
                    </div>
                    <div className="col-md-6 text-right">
                        <h5><Moment locale="uz" format="MMMM" date={new Date()} /> <Moment format="YYYY й." date={new Date()} /></h5>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th rowSpan="3">Сана</th>
                                    <th colSpan="4">Шифокорларга қатновлар сони</th>
                                    <th colSpan="8">Шу жумладан касалликлар туфайли</th>
                                    <th colSpan="2">Шу жумладан профилактик кўрик</th>
                                </tr>
                                <tr>
                                    <th rowSpan="2">Жами</th>
                                    <th colSpan="3">Улардан</th>
                                    <th colSpan="2">спортчи</th>
                                    <th colSpan="3">аҳоли</th>
                                    <th colSpan="3">суғурта</th>
                                    <th colSpan="2">спортчи</th>
                                </tr>
                                <tr>
                                    <th>спортчи</th>
                                    <th>аҳоли</th>
                                    <th>шартнома</th>
                                    <th>жами</th>
                                    <th>шу жумладан 18 ёшгача</th>
                                    <th>жами</th>
                                    <th>шу жумладан 18 ёшгача</th>
                                    <th>суммаси</th>
                                    <th>жами</th>
                                    <th>шу жумладан 18 ёшгача</th>
                                    <th>суммаси</th>
                                    <th>жами</th>
                                    <th>шу жумладан 18 ёшгача</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}