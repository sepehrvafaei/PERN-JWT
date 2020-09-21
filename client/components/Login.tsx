declare var require: any

var React = require('react');
import { Fragment } from "react";
var axios = require('axios');
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputs;
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const onSubmitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/auth/login", {
            email: email,
            password: password,
        })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                setAuth(true);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Fragment>
            <h1>Login</h1>
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
                <button type="submit" className="btn btn-success btn-block" >Login</button>
                <Link to="/register">Register</Link>
            </form>
        </Fragment>
    );
};
export default Login;
