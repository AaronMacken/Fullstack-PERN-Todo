import React, { Fragment, useEffect, useState } from "react";
import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);


    // get todos fn
    // function that hits the backend RESTful route for getting all todos from DB
    // set this JSON data into our useState array of todos
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            // parse the returned JSON data
            const jsonData = await response.json();
            // set state with returned data
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    // delete todos fn
    const deleteTodo = async (id) => {
        try {  
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            // update page without refreshing using filter on state
            setTodos(todos.filter((todo) => {
                return(
                    todo.todo_id !== id
                )
            }))
        } catch (error) {
            console.error(error.message);
        }
    }

    // every time this component renders, call the getTodos function
    // pass an empty array to the end so useEffect only makes 1 request instead of many
    useEffect(() => {
        getTodos();
    }, [])

    // test logging of our state
    // console.log(todos);
    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* 
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    */}
                    {/* map through our state to create our table data */}
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    {/* Need to give our edit todos 
                                        acdess to ListTodo state via props
                                    */}
                                    <EditTodo todo={todo}/>
                                </td>
                                <td>
                                <button className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;