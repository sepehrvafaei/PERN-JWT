declare var require: any

var React = require('react');
var axios = require('axios');
import { Fragment, useState, useEffect } from "react";
import InputTodo from "./todos/InputTodo";
import EditTodo from "./todos/EditTodo";
import ListTodo from "./todos/ListTodo";


const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);
    const  getProfile=async ()=> {
        try {
            const response = await axios.get("http://localhost:5000/dashboard", {
                headers: { 'token': localStorage.token }
            })
            console.log(response.data);
            setAllTodos(response.data);
            setName(response.data[0].user_name);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getProfile();
        setTodosChange(false);
    }, [todosChange])
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    return (
        <div>
            <div className="d-flex mt-5 justify-content-around">
            <h2>{name} 's To Do List</h2>
            <button className="btn btn-primary"
                onClick={(e) => logout(e)}
            >Logout
                </button>
            </div>
            <InputTodo setTodosChange={setTodosChange} />
            <ListTodo allTodos={allTodos} setTodosChange={setTodosChange} />
        </div>
        );
};
export default Dashboard;