declare var require: any;
var React = require('react');

import  { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
var axios = require('axios');


const ListTodos = ({ allTodos ,setTodosChange}) => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = (id) => {
        axios.delete("http://localhost:5000/dashboard/todos/"+id,
            {
                headers: { token: localStorage.token },
            })
            .then(response => {
                setTodos(todos.filter(todo => todo.todo_id !== id));
            }).catch();
    }

    useEffect(() => {
        setTodos(allTodos);
    }, [allTodos]);

    return (
        <Fragment>
            {" "}
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.length !== 0 &&
                        todos[0].todo_id !== null &&
                        todos.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo} setTodosChange={setTodosChange} />
                                </td>
                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;