import React, {Component} from 'react';
import {apiHost, getUser, strings} from "./Utils";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';

export default class ClinicListView extends Component {

    constructor() {
        super();
        this.state = {
            clinics: [],
            addModalOpen: false
        }
    }

    openAddModal(open) {
        this.setState({
            addModalOpen: open
        })
    }

    exportToExcel() {

    }

    render() {
        let user = getUser();
        return(
            <div className="container-fluid card card-body shadow-sm">
                <div className="form-row">
                    <div className="col-md-2">
                        {user.roles[0] === 'ADMIN' &&
                            <button className="btn btnBlue" onClick={this.openAddModal.bind(this, true)}>
                                <i className="fa fa-plus-square-o"/>{strings.add}</button>
                        }
                    </div>
                    <div className="col-md-8">
                        <h3 className="text-center position-relative">{strings.clinicList}</h3>
                    </div>
                    <div className="col-md-2">
                        <form id="excelForm" method="post" className="text-right" action={apiHost + "/common/clinicListExcel"}>
                            <button className="btn btnBlue" onClick={this.exportToExcel.bind(this)}><i
                                className="fa fa-file-excel-o"/>{strings.excel}</button>
                        </form>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12 tableScroll w-100 mt-1">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th style={{width: "5%"}}>{strings.numberSymbol}</th>
                                <th>{strings.name}</th>
                                <th>{strings.address}</th>
                                {user.role === 'ADMIN' &&
                                    <th>{strings.action}</th>
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.clinics}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal open={this.state.addModalOpen} onClose={this.openAddModal.bind(this, false)} center>
                    <div className="form-row mt-3">
                        <div className="col-md-12">
                            <label htmlFor="clinicName">{strings.name}</label>
                            <input className="form-control" id="clinicName"/>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="clinicAddress">{strings.address}</label>
                            <input className="form-control" id="clinicAddress"/>
                        </div>

                        <div className="col-md-12 text-center">
                            <button className="btn btn-success">{strings.save}</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}