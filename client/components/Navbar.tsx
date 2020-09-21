declare var require: any

var React = require('react');
import { Fragment } from "react";
import {Link } from "react-router-dom";


const Navbar= (props) => {
    return (
            <div className="navbar navbar-expand-sm bg-dark navbar-dark nav-fill w-100">
                <span className="navbar-brand" style={{ color: 'white' }}>To Do List</span>
                <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login</Link>
                    </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            </div>
    );
};
export default Navbar;