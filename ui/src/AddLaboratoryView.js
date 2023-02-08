import React, {Component} from 'react';
import LaboratoryLineItem from "./LaboratoryLineItem";
import swal from 'sweetalert';
import axios from 'axios';
import {apiHost, getKey, getUser, logout, strings} from "./Utils";

class AddLaboratoryView extends Component {

    constructor() {
        super();
        const urlParams = new URLSearchParams(window.location.search);
        const laboratoryId = urlParams.get('id');
        this.state = {
            laboratoryId: laboratoryId,
            name: '',
            price: '',
            items: [],
            defaultItem: {
                id: null,
                name: '',
                unit: '',
                normative: '',
            }
        };
        this.setValue = this.setValue.bind(this);
        this.addParameterLine = this.addParameterLine.bind(this);
        this.removeParameterLine = this.removeParameterLine.bind(this);
    }

    componentDidMount() {
        if (this.state.laboratoryId !== undefined && this.state.laboratoryId !== null && Number(this.state.laboratoryId) > 0) {
            let user = getUser();
            axios.get(apiHost + '/api/medService/get?id=' + this.state.laboratoryId,
                { headers: {Authorization: `Bearer ` + user.token} })
                .then(result => {
                    if (result.status === 200) {
                        if (result.data !== null) {
                            let items = [];
                            if (result.data.params.length === 0) {
                                let key = getKey();
                                items.push(<LaboratoryLineItem key={key} itemKey={key} item={this.state.defaultItem}
                                                               addParameterLine={this.addParameterLine}
                                                               removeParameterLine={this.removeParameterLine}/>);
                            } else {
                                items = result.data.params.map(row => {
                                    let key = getKey();
                                    return <LaboratoryLineItem key={key} itemKey={key} item={row}
                                                               addParameterLine={this.addParameterLine}
                                                               removeParameterLine={this.removeParameterLine}/>
                                })
                            }
                            this.setState({
                                name: result.data.name,
                                items: items
                            });
                        }
                    }
                })
        } else {
            this.addParameterLine();
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
        let items = [];
        let user=getUser();
        if (this.state.items.length > 0) {
            for (let i = 0; i < this.state.items.length; i++) {
                let item = this.state.items[i];
                let id = document.getElementById('id_' + item.props.itemKey).value;
                let name = document.getElementById('itemName_' + item.props.itemKey).value;
                let unit = document.getElementById('unitMeasurement_' + item.props.itemKey).value;
                let normative = document.getElementById('normative_' + item.props.itemKey).value;
                if (id === undefined || id === null || id.trim() === '') {
                    id = 0;
                }
                items[i] = {
                    "id": id,
                    "name": name,
                    "unit": unit,
                    "normative": normative
                };
            }
        } else {
            swal('Текширув параметрларини киритинг', '', 'error');
        }
        let laboratoryId = this.state.laboratoryId;
        laboratoryId = (laboratoryId !== undefined && laboratoryId !== null && Number(laboratoryId) > 0 ? laboratoryId : null);
        let data = {
            "id": laboratoryId,
            "name": this.state.name,
            "lineItems": JSON.stringify(items)
        };

        axios.post(apiHost + '/api/medService/add', data,{ headers: {Authorization: `Bearer ` + user.token}})
            .then(result => {
                if (result.status === 200) {
                    swal(result.data.message , '', 'success');
                }else if(result.status===401){
                    logout();
                }
                else {
                    swal(result.data.message, '', 'error');
                }
            })
    }


    addParameterLine() {
        let key = getKey();
        let items = this.state.items;
        items.push(<LaboratoryLineItem key={key} itemKey={key} item={this.state.defaultItem}
                                       addParameterLine={this.addParameterLine}
                                       removeParameterLine={this.removeParameterLine}/>);
        this.setState({
            items: items
        })
    }

    removeParameterLine(key) {
        let items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.props.itemKey === key) {
                items.splice(i, 1);
                break;
            }
        }
        this.setState({
            items: items
        })
    }

    render() {
        return (
            <div className="content">
                <div className="container card card-body shadow-sm">
                    <div className="form-row">
                        <div className="col-md-12 text-center">
                            <h5>{(this.state.laboratoryId === undefined || this.state.laboratoryId === null) ? strings.enterLaboratory : "Лаборатория таҳлили маълумотларини таҳрирлаш"}</h5>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <label htmlFor="name">{strings.name}</label>
                            <input id="name" className="form-control" defaultValue={this.state.name}
                                   onChange={this.setValue}/>
                        </div>
                    </div>
                    <fieldset>
                        <legend>{strings.parameters}</legend>
                        <div className="form-row">
                            <div className="col-md-12">
                                {this.state.items}
                            </div>
                        </div>
                    </fieldset>
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

export default AddLaboratoryView;