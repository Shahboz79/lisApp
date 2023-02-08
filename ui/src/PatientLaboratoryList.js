import React, {Component} from 'react';
import {
    apiHost,
    getKey,
    getUser,
    isLaboratory,
    isLaboratoryDepartment,
    strings
} from "./Utils";
import axios from 'axios';
import swal from 'sweetalert';
import 'react-responsive-modal/styles.css';
import Cookies from 'universal-cookie';
import printJS from 'print-js';

const cookies = new Cookies();

export default class PatientLaboratoryList extends Component {

    constructor(props) {
        super(props);
        let patientId = localStorage.getItem('patientId');
        this.state = {
            tableRows: [],
            tableData: [],
            patientId: patientId,
            payed: false
        };
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        this.getLaboratoryList();
        axios.get(apiHost + '/appointment/checkPaymentStatus?appointmentId=' + this.props.appointment.id).then(result => {
            if (result.data.statusCode === 200) {
                this.setState({
                    payed: result.data.data,
                });
            }
        });
    }

    setValue(e) {
        let name = e.target.id;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    openPage(appointmentLaboratory) {
        if (appointmentLaboratory.paymentStatus !== undefined && appointmentLaboratory.paymentStatus !== null && appointmentLaboratory.paymentStatus.id === 3) {
            localStorage.setItem('appointmentLaboratoryId', appointmentLaboratory.id);
            window.open(window.location.protocol + '//' + window.location.host + "/laboratoryView", '_self');
        }
    }

    getLaboratoryList() {
        axios.get(apiHost + '/patient/laboratory/list?appointmentId=' + this.props.appointment.id).then(result => {
            if (result.status === 200) {
                let options = [], count=1;
                if (result.data !== undefined && result.data !== null) {
                    for (let i = 0; i < result.data.length; i++) {
                        let row = result.data[i];
                        for (let j = 0; j < row.result.length; j++) {
                            let rowItem = row.result[j];
                            let filled = rowItem.result !== undefined && rowItem.result !== null && rowItem.result !== '';
                            options.push(<tr key={getKey()} style={{backgroundColor: (filled ? 'rgb(0 255 0 / 40%)' : '#FFFFFF')}}>
                                <td>{count}</td>
                                <td><b>{rowItem.name}</b></td>
                                <td>{!isLaboratoryDepartment() ? rowItem.result :
                                    <input className="form-control" id={'ri_' + rowItem.id} defaultValue={rowItem.result}/>}</td>
                                <td>{rowItem.normative}</td>
                                <td>{row.member.name}</td>
                                <td>{row.paymentStatus !== undefined && row.paymentStatus !== null ? row.paymentStatus.name : "Тўланмаган"}</td>
                            </tr>);
                            count++;
                        }
                    }
                    this.setState({
                        tableRows: options,
                        tableData: result.data
                    })
                }
            }
        });
    }

    saveLaboratoryItemsResult() {
        let resultArray = [];
        for (let i = 0; i < this.state.tableData.length; i++) {
            let row = this.state.tableData[i];
            for (let j = 0; j < row.result.length; j++) {
                let rowItem = row.result[j];
                let resultItem = document.getElementById('ri_' + rowItem.id).value;
                if (resultItem !== null && resultItem !== '') {
                    resultArray.push({"id": rowItem.id, "result": resultItem});
                }
            }
        }
        let user = getUser();
        let formData = {
            "member": {
                "id": user.id
            },
            "result": resultArray
        };
        axios.post(apiHost + '/patient/laboratory/item/saveResult', formData)
            .then(result => {
                if (result.data.statusCode === 200) {
                    swal(result.data.message, "", 'success');
                    this.getLaboratoryList();
                } else {
                    swal(result.data.message, "", 'error');
                }
            });
    }

    openAddModal() {
        window.open(window.location.protocol + '//' + window.location.host + "/addLabToPatient?appointmentId=" + this.props.appointment.id, '_blank');
    }

    exportToPDF() {
        cookies.set('appointmentId', this.props.appointment.id, {path: '/'});
        let form = document.getElementById("labPDFForm" + this.props.appointment.id);
        form.submit();
    }

    exportToPDFCustom(formName) {
        cookies.set('appointmentId', this.props.appointment.id, {path: '/'});
        let form = document.getElementById("lab" + formName + "PDFForm" + this.props.appointment.id);
        form.submit();
    }

    printBarCode() {
        axios.get(apiHost + '/appointment/printBarCode?appointmentId=' + this.props.appointment.id).then(result=>{
            if (result.data.statusCode === 200) {
                printJS({printable: 'http://192.168.110.205:8080/files/laboratory/' + this.props.appointment.id + '.png', type: 'image', header: '', documentTitle: ''});
            } else if (result.data.statusCode === 500) {
                swal(result.data.message, '', 'error');
            }
        })
    }

    render() {
        let user = getUser();
        return (
            <div className="card-body shadow-sm">
                <div className="form-row">
                    <div className="col-md-8 text-center">
                        <h4>{strings.laboratoryAnalyse} &nbsp; № {this.props.appointment.id}</h4>
                    </div>

                    <div className="col-md-4">
                        <div style={{display: "flex", float: "right"}}>
                            {isLaboratory(user) &&
                            <div className="d-flex">
                                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-print"/>
                                </button>
                                <div className="dropdown-menu">
                                    <form id={"labOAKPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryOAK24ResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'OAK')}>
                                            OAK 24
                                        </button>
                                    </form>
                                    <form id={"labIFAPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryIFAResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'IFA')}>
                                            ИФА
                                        </button>
                                    </form>
                                    <form id={"labBXPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryBXResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'BX')}>
                                            Биохимия
                                        </button>
                                    </form>
                                    <form id={"labKOAPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryKOAResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'KOA')}>
                                            Коагулограмма
                                        </button>
                                    </form>
                                    <form id={"labVITPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryVITResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'VIT')}>
                                            Витамины
                                        </button>
                                    </form>
                                    <form id={"labINFPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryINFResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'INF')}>
                                            Инфекции
                                        </button>
                                    </form>
                                    <form id={"labMOCHPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryMOCHResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'MOCH')}>
                                            Анализ мочи
                                        </button>
                                    </form>
                                    <form id={"labMOCHNECHPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryMOCHNECHResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'MOCHNECH')}>
                                            Анализ мочи Нечипоренко
                                        </button>
                                    </form>
                                    <form id={"labXGCHPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryXGCHResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'XGCH')}>
                                            ХГЧ
                                        </button>
                                    </form>
                                    <form id={"labKYAPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryKYAResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'KYA')}>
                                            Кал яйца глистов
                                        </button>
                                    </form>
                                    <form id={"labGLTLPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryGLTLResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'GLTL')}>
                                            Глюкоза-толерантный тест
                                        </button>
                                    </form>
                                    <form id={"labXBPPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryXBPResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'XBP')}>
                                            Хеликобактер Пилори
                                        </button>
                                    </form>
                                    <form id={"labPSAPDFForm" + this.props.appointment.id} method="post" action={apiHost + "/common/LaboratoryPSAResultPDF"}>
                                        <button className="dropdown-item" title={strings.exportToPDF} onClick={this.exportToPDFCustom.bind(this, 'PSA')}>
                                            ПСА (онкомаркер)
                                        </button>
                                    </form>
                                </div>

                                <form id={"labPDFForm" + this.props.appointment.id} method="post" className="ml-1" action={apiHost + "/common/laboratoryResultPDF"}>
                                    <button className="btn btnBlue" title={strings.exportToPDF} onClick={this.exportToPDF.bind(this)}>
                                        <i className="btnBlue fa fa-file-pdf-o"/>
                                    </button>
                                </form>

                                <button className="btn btn-info ml-1" title={strings.printBarCode}
                                    onClick={this.printBarCode.bind(this)}><i className="fa fa-barcode"/></button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12 order-md-1 pt-2">
                        <table className="table table-striped table-bordered shadow">
                            <thead>
                            <tr>
                                <th scope="col">{strings.cage}</th>
                                <th scope="col">{strings.typeAnalysis}</th>
                                <th scope="col">{strings.result}</th>
                                <th scope="col">{strings.standard}</th>
                                <th scope="col">{strings.laborant}</th>
                                <th scope="col">{strings.payType}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isLaboratoryDepartment() &&
                <div className="form-row">
                    <div className="col-md-12 pt-2 text-center">
                        <button className="btn btnBlue" type="button"
                                onClick={this.saveLaboratoryItemsResult.bind(this)}>{strings.save}</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}