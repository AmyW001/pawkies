import React from 'react'
import { useState } from 'react';

export default function SignUpForm() {

//states for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

//check errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

//handle name change
const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
};

//handle email change
const handleEmail = (e) => {
    setEmail(e.taget.value);
    setSubmitted(false);
};

//handle password
const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
};

//form submit
const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
        setError(true);
    } else {
        setSubmitted (true);
        setError(false);
    }
};

//Welcome success message
const successMessage = () => {
    return (
        <div
        className = "success"
        style={{
            display: submitted ? '' : 'none'
        }}>
        <h1>User {name} Welcome!!</h1>
        </div>
    );
};
 
//show error message if true
const errorMessage = () => {
    return (
        <div className = "error"
        style= {{
            display: error ? '' : 'none',
        }}>
            <h1>Please enter all fields</h1>
        </div>
    );
};

  return (
    <div className = "form">
        <h1>Sign up</h1>
        <div className = "messages">
            {errorMessage()}
            {successMessage()}
        </div>
    <form>
        <label className ="label">Name</label>
        <input onChange= {handleName} className="input"
        value = {name} type= "text"/>

        <label className="label">Email</label>
        <input onChange={handleEmail} className="input"
        value={email} type ="email"/>

        <label className ="label">Password</label>
        <input onChange={handlePassword} className="input"
        value={password} type="password" />

        <button onClick={handleSubmit} className="btn btn-secondary my-2 my-sm-0" type="submit"></button>

    </form>
    </div>
  )
}
