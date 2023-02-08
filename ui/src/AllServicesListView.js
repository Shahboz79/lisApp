import React, {Component} from 'react';
import {apiHost, getKey, strings} from "./Utils";
import axios from 'axios';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import swal from 'sweetalert';

export default class AllServicesListView extends Component {

    constructor() {
        super();
        this.state = {
            allData: [],
            services: [],
            allServices: [],
            members: [],
            allMembers: [],
            categories: [],
            service: null,
            openEditModal: false,
            openAddModal: false,
            serviceType: 'laboratory'
        };
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get(apiHost + '/settings/service/list2').then(result=>{
            if (result.data.statusCode === 200) {
                let str = [], str2 = [], serviceList = [];
                for (let j=0; j<result.data.data.length; j++) {
                    let row = result.data.data[j];
                    serviceList.push(row);
                    str.push(<tr key={getKey()}>
                        <td className="text-left">{j+1}</td>
                        <td className="text-left"><span className="linkStyle" onClick={this.openEditModal.bind(this, result.data.data[j])}>{result.data.data[j].name}</span></td>
                        <td className="text-left">{result.data.data[j].price}</td>
                        <td><button className="btn btn-danger" onClick={this.removeService.bind(this, row)}><i className="fa fa-remove"/></button></td>
                    </tr>);
                    str2.push(<tr key={getKey()}>
                        <td className="text-left">{j+1}</td>
                        <td className="text-left"><span className="linkStyle" onClick={this.openEditModal.bind(this, result.data.data[j])}>{result.data.data[j].name}</span></td>
                        <td className="text-left">{result.data.data[j].price}</td>
                        <td><button className="btn btn-danger" onClick={this.removeService.bind(this, row)}><i className="fa fa-remove"/></button></td>
                    </tr>);
                }
                this.setState({
                    serviceList: serviceList,
                    allServices: str2,
                    services: str
                })
            }
        })
    }

    onSearch() {
        let keyword = document.getElementById('searchBox').value;
        let services = [];
        if (keyword !== '') {
            for (let i = 0; i < this.state.serviceList.length; i++) {
                let row = this.state.serviceList[i];
                if (row.name.toLowerCase().includes(keyword.toLowerCase())) {
                    services.push(<tr key={getKey()}>
                        <td className="text-left">{i+1}</td>
                        <td><span className="linkStyle" onClick={this.openEditModal.bind(this, row)}>{row.name}</span></td>
                        <td>{row.price}</td>
                        <td><button className="btn btn-danger" title={strings.remove} onClick={this.removeService.bind(this, row)}><i className="fa fa-remove"/></button></td>
                    </tr>);
                }
            }
        } else {
            services = this.state.allServices
        }
        this.setState({
            services: services
        });
    }

    removeService(row) {
        axios.delete(apiHost + '/settings/service/remove?id=' + row.id + '&type=' + row.description).then(result=>{
            if (result.data.statusCode === 200) {
                this.loadData();
                swal(result.data.message, '', 'success');
            } else {
                swal(result.data.message, '', 'error');
            }
        })
    }

    openEditModal(row) {
        this.setState({
            service: row,
            openEditModal: true
        })
    }

    closeEditModal(modalName) {
        this.setState({
            service: null,
            [modalName]: false
        })
    }

    editService() {
        let serviceName = document.getElementById('serviceName').value;
        let price = document.getElementById('price').value;
        if (serviceName === '') {
            swal(strings.enterServiceName, '', 'error');
            return;
        }
        if (price === '') {
            swal(strings.enterServicePrice, '', 'error');
            return;
        }

        let data = {};
        data.id = this.state.service.id;
        data.name = serviceName;
        data.price = Number(price);
        data.description = this.state.service.description;
        axios.post(apiHost + '/settings/service/add', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(result=>{
            if (result.data.statusCode === 200) {
                swal(result.data.message, '', 'success');
                this.loadData();
                this.closeEditModal();
            } else {
                swal(result.data.message, '', 'error');
            }
        })
    }

    saveService() {
        let serviceName = document.getElementById('serviceName1').value;
        let price = document.getElementById('price1').value;
        if (serviceName === '') {
            swal(strings.enterServiceName, '', 'error');
            return;
        }
        if (price === '') {
            swal(strings.enterServicePrice, '', 'error');
            return;
        }

        let data = {};
        data.name = serviceName;
        data.price = Number(price);
        data.description = this.state.serviceType;

        let categoryId = document.getElementById('category').value;
        if (categoryId === '') {
            swal(strings.enterServiceCategory, '', 'error');
            return;
        }
        data.status = {
            "id": categoryId
        };

        let selectedMembers = [];
        for (let i=0; i<this.state.allMembers.length; i++) {
            let chb = document.getElementById('mem_' + this.state.allMembers[i].id);
            if (chb.checked) {
                selectedMembers.push({"id": this.state.allMembers[i].id});
            }
        }
        data.files = selectedMembers;
        axios.post(apiHost + '/settings/service/add2', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(result=>{
            if (result.data.statusCode === 200) {
                swal(result.data.message, '', 'success');
                this.loadData();
                this.closeEditModal();
            } else {
                swal(result.data.message, '', 'error');
            }
        })
    }

    addService() {
        axios.get(apiHost + '/member/list').then(result=>{
           if (result.data.statusCode === 200) {
               let rows = result.data.data.map(row=>{
                   return <tr>
                       <td><input type="checkbox" id={"mem_" + row.id} className="form-check"/></td>
                       <td>{row.lastName + ' ' + row.firstName}</td>
                   </tr>
               });
               this.setState({
                   members: rows,
                   allMembers: result.data.data
               })
           }
        });
        axios.get(apiHost + '/settings/service/category/list').then(result=>{
           if (result.data.statusCode === 200) {
               let rows = result.data.data.map(row=>{
                   return <option value={row.id}>{row.name}</option>
               });
               this.setState({
                   categories: rows
               })
           }
        });
        this.setState({
            openAddModal: true
        })
    }

    setCategory(category) {
        this.setState({
            serviceType: category
        })
    }

    render() {
        let maxHeight = window.screen.height - 300;
        return (
            <div className="content">
                <div className="container card card-body shadow-sm">
                    <div className="form-row mb-2">
                        <div className="col-md-8">
                            <button className="btn btn-success" onClick={this.addService.bind(this)}>{strings.add}</button>
                        </div>
                        <div className="col-md-4 text-right">
                            <input className="form-control" id="searchBox" placeholder={strings.searchKeyword}
                                   aria-label={strings.search} aria-describedby="basic-addon2" type="text"
                                   onChange={this.onSearch}/>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="col-md-12">
                            <div style={{overflowY: "auto", maxHeight: maxHeight + 'px', border: "1px solid #000000"}}>
                                <table className="table-bordered w-100" cellPadding={5}>
                                    <thead>
                                    <tr>
                                        <th>{strings.cage}</th>
                                        <th>{strings.serviceName}</th>
                                        <th>{strings.servicePrice}</th>
                                        <th>{strings.action}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.services}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal open={this.state.openEditModal} onClose={this.closeEditModal.bind(this, 'openEditModal')} center>
                    <div className="form-row">
                        <div className="col-md-12 text-center mb-3">
                            <b>{strings.editService}</b>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="serviceName">{strings.serviceName}</label>
                            <textarea id="serviceName" className="form-control" defaultValue={this.state.service !== null ? this.state.service.name : ''}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="price">{strings.servicePrice}</label>
                            <input type="number" id="price" className="form-control" defaultValue={this.state.service !== null ? this.state.service.price : ''}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 text-center">
                            <button className="btn btn-success"
                                    onClick={this.editService.bind(this)}>{strings.save}</button>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.openAddModal} onClose={this.closeEditModal.bind(this, 'openAddModal')} center>
                    <div className="form-row">
                        <div className="col-md-12 text-center mb-3">
                            <b>{strings.addService}</b>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 text-center mb-2">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="laboratoryRB" value="option1" defaultChecked={true} onClick={this.setCategory.bind(this, 'laboratory')}/>
                                <label className="form-check-label" htmlFor="laboratoryRB">{strings.laboratory}</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="serviceRB" value="option2" onClick={this.setCategory.bind(this, 'service')}/>
                                <label className="form-check-label" htmlFor="serviceRB">{strings.service1}</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="serviceName1">{strings.serviceName}</label>
                            <textarea id="serviceName1" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="price1">{strings.servicePrice}</label>
                            <input type="number" id="price1" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="category">Категория</label>
                            <select id="category" className="form-control">
                                {this.state.categories}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3" style={{overflowY: "auto", maxHeight: "420px"}}>
                            <table className="table table-responsive table-bordered w-100" cellPadding={5}>
                                <thead>
                                <th width="10%">#</th>
                                <th width="90%">{strings.doctor}</th>
                                </thead>
                                <tbody>
                                {this.state.members}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 text-center">
                            <button className="btn btn-success"
                                    onClick={this.saveService.bind(this)}>{strings.save}</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}