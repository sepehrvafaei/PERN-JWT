declare var require: any

import { Fragment, useState } from "react";
var React = require('react');
var axios = require('axios');


const InputTodo = ({ setTodosChange}) => {
    const [description, setDescription] = useState("");

    const onSubmitForm = e => {
        e.preventDefault();
        const data = { description: description };
        axios.post("http://localhost:5000/dashboard/todos", data,
            { headers: { token: localStorage.token } }).
            then(response => {
                console.log(response.data);
                setTodosChange(true);
                setDescription("");
            }).catch(err => { console.error(err.message) });
    }
        return (
        <Fragment>
            <h1 className="text-center my-5">Input Todo</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    placeholder="add todo"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success ">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;