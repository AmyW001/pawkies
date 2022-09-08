import React from 'react'
import { useState } from 'react';


export default function SignUpForm({addUser}) {

const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

const [userAllData, setUserAllData] = useState ({
    name: "",
    email: "",
    password: "",
    location: "",
    dogname: "",
    dogdescription: "",
})

//This function replace all the "handlename,handlepassword" etc
const handleChange = (event) => {
    const name = event.target.name;
    const value= event.target.value;
    setUserAllData((state) => ({
        ...state,
        [name]: value,
    }));
    setSubmitted(false);
    console.log(value);
}


//form submit
const handleSubmit = (e) => {
    e.preventDefault();
    //Putting the group of properties on the props
    addUser(userAllData);
    addnewUser();
    if (userAllData.name === '' || userAllData.email === '' || userAllData.password === '') {
        setError(true);
    } else {
        setSubmitted (true);
        setError(false);
    }
};

//Posting the new user in the database
const addnewUser = () => {
    fetch ("/sign-up", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            user_name: userAllData.name,
            user_email: userAllData.email,
            password: userAllData.password,  
            location: userAllData.location,
            user_dog_name: userAllData.dogname,
            user_dog_description: userAllData.dogdescription
        }),
    })

    .then((res) => res.json())
    .then(json => {
        setUserAllData(json);
    })
    .catch(error => {
       // upon failure, show error message 
    })
}

//Welcome success message
const successMessage = () => {
    return (
        <div
        className = "success"
        style={{
            display: submitted ? '' : 'none'
        }}>
        <h1>User {userAllData.name} Welcome!!</h1>
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
    <form onSubmit={handleSubmit}>
        <label className ="label">Name</label>
        <input 
        name= "name"
        type= "text"
        value = {userAllData.name}
        onChange= {handleChange} 
        className="input"
        required 
        />

        <label className ="label">Email</label>
        <input 
        name= "email"
        type= "text"
        value= {userAllData.email}
        onChange={handleChange}
        className="input"
        required 
        />

        <label className ="label">Password</label>
        <input 
        name= "password"
        type="password"
        value = {userAllData.password}
        onChange={handleChange} 
        className="input"
        required />

        <label className ="label">Location</label>
        <input 
        name="location"
        type="text"
        value = {userAllData.location}
        onChange={handleChange} 
        className="input"
        required/>

        <label className ="label">Dog's name</label>
        <input 
        name="dogname"
        type="text"
        value={userAllData.dogname}
        onChange={handleChange} 
        className="input"
        required
        />  


        <label className ="label">Dog's Description</label>
        <input 
        name= "dogdescription"
        type= "text"
        value= {userAllData.dogdescription}
        onChange={handleChange} 
        className="input"
        required/>  


        <button className="btn btn-secondary my-2 my-sm-0" type="submit"></button>
    </form>
    </div>
  )
};