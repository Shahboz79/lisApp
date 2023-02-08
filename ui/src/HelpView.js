import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import {strings} from "./Utils";
import image_1 from './images/registerhelp.jpg';
// import image_2 from './images/addmember.jpg';
class HelpView extends Component {

        state = {
            user: {},
            open: false,
            contents: [],
            helpContent: ''
        };
    https://itproger.com/


    componentDidMount() {
        let contents = [];//0-registratura, 1-kassa
        contents.push(<ul>
            <li>Регистратура платформага кирганда асосий менюда беъморлар рўйхати коринади. </li>
            <li>Ушбу беморлар хақида маълумотлар чикади исми, фамиляси,телефон раками, паспорт раками ва манзили хакида маълумотга эга бўлиши мумкин.</li>
            <li>Шунингдек беморнинг исми ёки фамиляси устига босилганда у беморнинг айнан кайси доктор кабулига келганлиги келганлиги ва даволанган вактини кўриш мумкин </li>
            <li>Бемор фамилиясининг устига босиб кирилганда бемор малумотлари сахифасига ўтилади, бу сахифада текширувлар рўйхати ва тахлиллар рўйхати кўринади ва бу ердаги тугма оркали тахлиллар кўшиш имконияти бор </li>
            <li>Бу ерда белгиланган доктор ва хизмат турлари белгиланган докторда кўринади </li>
            <li>Спортчилар рўйхатига ўтилганда ЧТТ танлаш ёки янги ЧТТ кўшиш имконияти мавжуд</li>
        </ul>);
        contents.push(<ul>
            <li>Касса сахифасига кирганда тўловлар рўйхати коринади </li>
            <li>Беморнинг кайси бўлимга келгани килкан тўловлари  хамда качон келганини кўриш мумкин </li>
            <li>Агар моулажа амалга оширилмаган бўлса пулни кайтариш мумкин</li>
            <li>Тўловлар рўйхатини юклаб олиш имконияти хам бор </li>
        </ul>);
        contents.push(<ul>
            <li>Поликлиника бўлимига кирганда беморнинг асосий маълумотлари</li>
            <li>Бўлимдаги кўрик ва лабаратория тахлиллари хамда даволаш ишларини кўриш мумкин</li>
            <li>Асосий маълумотлар тўлдирилгандан кейин буларга кўшимча равишда хизмат кўшиш имконияти мавжуд</li>
        </ul>);
        contents.push(<ul>
            <li>Лабаратория бўлимига кирганда анализлар рўйхати кўринади</li>
            <li>Лабаратория нархлари ва уларни ўзгартириш янги кўшиш имконияти мавжуд</li>
        </ul>);
        contents.push(<ul>
            <li>Стационар бўлимига кирганда бемор маълумотлари касаллик тарихи ва бўлимдаги кўрикларни кўриш мумкин</li>
            <li>Даволаш ишлари ва хар бир ишдатилган буюмларни кўриш мумкин бўлади</li>
        </ul>);
        contents.push(<ul>
            <li>tez yordam</li>
        </ul>);
        contents.push(<ul>
            <li>Админ сифатида платформага кирганда.</li>
            <li>Созламалар бўлимидан хизмат турлари, дорилар унинг номи нархи ва изохини кўшиш мумкин.</li>
            <li>Созламалар менюсидан лабаратория менюсида лабаратория кўшиш. </li>
            <li>Ходимлар менюсига ўтганда ходим кўшиш тугмачаси оркали ходимнинг исми шарифи фамилияси лавозими ва унга логин парол хамда хизмат турлари кўшса бўлади</li>
        </ul>);
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            user: user,
            contents: contents
        });
    }
    setLanguage =(lang)=> {
        this.props.changeLanguage(lang);
    };
    openModal(id){
        this.setState({
            helpContent: this.state.contents[id],
            help2Content: this.state.contents[id],
            open: true
        })

    };

    closeModal=()=>{
        this.setState({
            open: false
        })
    };


    render() {
        const {open} = this.state;
        return (
            <div className="container">
                <ul className="header fixed-top">
                    <li><NavLink to="/patients">{strings.patients}</NavLink></li>
                    <li><NavLink to="/sportsmanList">{strings.sportsmanList}</NavLink></li>
                    <li><NavLink to="/reports">{strings.reports}</NavLink></li>
                    <li><NavLink to="/settings">{strings.settings}</NavLink></li>
                    <li><NavLink to="/" className="float-right">{strings.logout}</NavLink></li>
                    <li><span>{this.state.user.lastName + ' ' + this.state.user.firstName}</span></li>
                    <li><span title="Русский" style={{backgroundImage: "url('/images/flag_ru.png')", margin: "10px", cursor: "pointer"}} onClick={this.setLanguage.bind(this, 'ru')}/></li>
                    <li><span title="Ўзбекча" style={{backgroundImage: "url('/images/flag_uz.png')", margin: "10px", cursor: "pointer"}} onClick={this.setLanguage.bind(this, 'uz')}/></li>
                </ul>
                <div className="row">
                    <main role="main">
                        <div className="album py-5 bg-light">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                            <img className="card-img-top" src="./images/login.jpg" />
                                            <div className="card-body">
                                                <button className="card-text text-center btn-outline-primary" onClick={this.openModal.bind(this, 0)} >Платформага регистратура  сифатида кириш</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                          <img className="card-img-top" src="./images/login.jpg"/>
                                            <div className="card-body">
                                                <button className="card-text text-center btn-outline-primary " onClick={this.openModal.bind(this, 1)} >Платформага касса сифатида кириш </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                            <img className="card-img-top" src="./images/login.jpg"/>
                                            <div className="card-body">
                                                <button className="card-text text-center btn-outline-primary" onClick={this.openModal.bind(this, 2)} >Платформага поликлиника сифатида кириш</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                            <img className="card-img-top" src="./images/login.jpg"
                                                 />
                                            <div className="card-body">
                                                <button className="card-text text-center btn-outline-primary" onClick={this.openModal.bind(this, 3)} >Платформага лабаратория сифатида кириш</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                            <img className="card-img-top" src="./images/login.jpg"/>
                                            <div className="card-body">
                                                <button className="card-text text-center btn-outline-primary" onClick={this.openModal.bind(this, 4)} >Платформага статционар сифатида кириш</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                            <img className="card-img-top" src="./images/login.jpg"/>
                                            <div className="card-body">
                                              <button className="card-text text-center btn-outline-primary" onClick={this.openModal.bind(this, 5)} >Платформага тез ёрдам сифатида кириш</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4 shadow-sm">
                                            <img className="card-img-top" src="./images/login.jpg"/>
                                            <div className="card-body">
                                              <button className="card-text text-center btn-outline-primary" onClick={this.openModal.bind(this, 6)} >Платформага админ сифатида кириш</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <Modal open={open} onClose={this.closeModal} center>
                    <div className="container">
                        <div className="row">
                            <div classname="parentDiv">
                                <div className="img_div">
                                    <img className="img_1" src={image_1}/>
                                </div>
                                <div className="col-md-6 rounded float-left" >
                                    {this.state.help2Content}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default HelpView;