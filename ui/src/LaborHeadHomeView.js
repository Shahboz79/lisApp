import React, {Component} from 'react';
import Footer from "./Footer";
import {checkUserRole} from './Utils';
import LaboratoryListView from "./LaboratoryListView";

export default class LaboratoryHeadHomeView extends Component {

    openView(patientId) {
        localStorage.setItem('patientId', patientId);
        window.open(window.location.protocol + '//' + window.location.host + "/plListView", '_self');
    }

    render() {
        checkUserRole('HEADOFLABORATORY');
        return (
            <div className="labaratory">
                <div className="content">
                    <div className="container card card-body shadow-sm">
                        <div className="form-row">
                            <div className="col-md-12">
                                <LaboratoryListView/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}