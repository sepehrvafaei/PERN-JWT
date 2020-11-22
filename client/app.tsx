declare var require: any

var React = require('react');
var axios = require('axios');
import { useState,useEffect } from "react";
var ReactDOM = require('react-dom');
import { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect,Link } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";

function App(){
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const setAuth = (boolean) => { setIsAuthenticated(boolean) };
    async function isAuth() {
        try {
            const response = await axios.get("http://localhost:5000/auth/verify", {
                headers: { 'token': localStorage.token }
            })
            response.data ? setIsAuthenticated(true) : setIsAuthenticated(false)
        }
        catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => { isAuth()})
    return (
        <Fragment>
            <BrowserRouter>
                <Navbar />
                <Weather/>
                <div className="continaer">
                    <Switch>
                <Route
                    exact
                    path='/Login'
                    render={(props: any) =>
                        !isAuthenticated ?
                            (<Login {...props} setAuth={setAuth} />)
                            : (<Redirect to="/dashboard" />)}
                />
                <Route
                    exact
                    path="/register"
                    render={(props: any) =>
                        !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" />)
                    }
                />
                <Route
                    exact
                    path="/dashboard"
                    render={(props: any) =>
                        isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)
                    }
                />
                    </Switch>
                    </div>
            </BrowserRouter>
            </Fragment>
  );
}

ReactDOM.render(
        <App />
    , document.getElementById('root'));