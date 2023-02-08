import React, {Component} from "react";
import axios from "axios";
import * as _ from "./Utils";
import {strings} from "./Utils";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import AddMemberView from "./AddMemberView";

export default class MemberListView extends Component {

    constructor() {
        super();
        let screenHeight = window.screen.height;
        this.state = {
            memberRows: [],
            screenHeight1: screenHeight - 213,
            screenHeight2: screenHeight - 300,
            openAddMemberModal: false,
            member: null
        };
        this.getMemberList = this.getMemberList.bind(this);
    }

    componentDidMount() {
        this.getMemberList();
    }

    getMemberList() {
        axios.get(_.apiHost + '/member/list').then(result => {
            if (result.data.statusCode === 200) {
                let options = [];
                for (let i = 0; i < result.data.data.length; i++) {
                    let row = result.data.data[i];
                    options.push(<tr key={'ml_' + row.id}>
                        <td>{row.id}</td>
                        <td>
                            <span>{row.lastName + ' ' + row.firstName}</span></td>
                        <td>{row.position.name}</td>
                    </tr>);
                }
                this.setState({
                    memberRows: options
                })
            } else {
                this.setState({
                    memberRows: []
                })
            }
        })
    }

    openModal(modalName) {
        this.setState({
            [modalName]: true
        })
    }

    closeModal(modalName) {
        this.setState({
            [modalName]: false
        })
    }

    render() {
        return (
            <div className="doctors">
                <div className="content" style={{height: this.state.screenHeight1}}>
                    <div className="container card card-body my-4">
                        <div className="form-row">
                            <div className="col-md-2">
                                <button className="btn btnBlue" onClick={this.openModal.bind(this, 'openAddMemberModal')}>
                                    <i className="fa fa-plus-square-o"/> {strings.add}</button>
                            </div>
                            <div className="col-md-10 text-center ">
                                <h3>{strings.memberList}</h3>
                            </div>
                        </div>
                        <div className="tableScroll w-100" style={{height: this.state.screenHeight2}}>
                            <table id="listTable" className="table table-striped table-bordered shadow">
                                <thead>
                                <tr>
                                    <th scope="col">{strings.numberSymbol}</th>
                                    <th scope="col">{strings.membersFullName}</th>
                                    <th scope="col">{strings.position}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.memberRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.openAddMemberModal} onClose={this.closeModal.bind(this, 'openAddMemberModal')} center>
                    <AddMemberView getMemberList={this.getMemberList}/>
                </Modal>
            </div>
        )
    }
}