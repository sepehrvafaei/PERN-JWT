declare var require: any
var axios = require('axios');

var React = require('react');

import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
const Register = ({ setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name:""
    });
    const { email, password, name } = inputs;
    const onChange = (e) => {
        setInputs({ ...inputs,[e.target.name]:e.target.value });
    }
    const onSubmitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/auth/register", {
                email: email,
                password: password,
                name:name
            })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                setAuth(true);
            })
                .catch(error=>{
                    console.log(error);
                });
    }
    return (
        <Fragment >
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input className="form-control my-3"
                    type="email" name="email" placeholder="email"
                    value={email}
                    onChange={e => onChange(e)}
                    />
                <input className="form-control my-3" type="password"
                    name="password" placeholder="password"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <input className="form-control my-3" type="text"
                    name="name" placeholder="name"
                    value={name}
                    onChange={e => onChange(e)}
                />
                <button type="submit" className="btn btn-success btn-block" >Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
};
export default Register;