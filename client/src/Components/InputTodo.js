import React, { Fragment, useState } from 'react';

const InputTodo = () => {

    const [description, setDescription] = useState("");

    // reach the CREATE route on the backend on form submit
    const onSubmitForm = async e => {
        e.preventDefault(); // prevent refresh
        try {
            const body = { description }; // body of request is our forms data
            // following function is a variable pointing to the return value
            // of the fetch FN reaching out to the back-end RESTful endpoint
            const response = await fetch("http://localhost:5000/todos", {
                // adding more config bercause fetch is get by default
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            // refresh after complete
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;