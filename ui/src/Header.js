import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {getUser} from "./Utils";

export default class Header extends Component {

    render() {
        let user = getUser();
        return (
            <div>
                {user !== undefined && user !== null && user.roles !== null && user.roles.length > 0 &&
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <NavLink to="/patients">Беморлар</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/laboratoryList">Анализлар</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/settings">Созламалар</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/deviceList">DeviceList</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/clinicDeviceList">ClinicDeviceList</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/">Чикиш</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                }
            </div>
        )
    }
}