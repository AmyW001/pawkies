import "./App.css";
import React, { useState, useEffect } from "react";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header.js";
import HomePage from "./Components/HomePage.js";
import MyChatComponent from "./Components/MyChatComponent.js";
import LoginForm from "./Components/LogInForm.js";
import AddWalkForm from "./Components/AddWalkForm";
import AllWalks from "./Components/AllWalks";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import IndividualWalk from "./Components/IndividualWalk";

function App() {
  //hardcoded data below, as temporary fix
  const [loggedIn, setLoggedIn] = useState({
    user_Id: 9,
    user_name: "Mimi",
    user_email: "mimi@notreal.co",
    photoUrl: "jessica.jpeg",
    role: "default",
  });
  const [Walks, setWalks] = useState([]);
  const [Users, setUsers] = useState([]);
  
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const mapLatitude = latitude.map(l => console.log(l));
  console.log(mapLatitude);

  const [coordinates, setCoordinates] = useState({latitude: "", longitude: ""})


  const dataToChatComponent = () => {
    //send data to chatComponent using this function
  };

  // const handleLoggedInData = (loggedInData) => {
  //   //function for getting data from child component SignUpForm
  //   //***use this once loginform is up and running***:
  //   // setLoggedIn((currentState) => [...currentState, loggedInData]);
  // };

  const handleAddWalk = (newWalk) => {
    setWalks((state) => [...state, newWalk]);
  };

  const handleAddUser = (newUser) => {
    setUsers((state) => [...state, newUser]);
  };

  // const handleAddLatitude = (newLatitude) => {
  //   setLatitude((state) => [...state, newLatitude]);
  // };

  // const handleAddLongitude = (newLongitude) => {
  //   setLongitude((state) => [...state, newLongitude]);
  // };

  const handleAddCoordinates = (newCoordinates) => {
    setCoordinates((state) => [...state, newCoordinates]);
  };

  return (
    <div className="App">
    <div>
      <Header sessionProps={loggedIn} />

      <Routes>
        <Route
          path="/user/:user_name"
          element={<UserProfile sessionProps={loggedIn} />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<MyChatComponent />} />
        <Route
          path="/login"
          element={
            <LoginForm
            // loggedInData={(loggedInData) => handleLoggedInData(loggedInData)}
            />
          }
        />
        <Route
          path="/addwalkform"
          element={
            <AddWalkForm 
            addWalk={(newWalk) => handleAddWalk(newWalk)}
            // addLatitude={(newLatitude) => handleAddLatitude(newLatitude)}
            // addLongitude={(newLongitude) => handleAddLongitude(newLongitude)}
            addCoordinates={(newCoordinates) => handleAddCoordinates(newCoordinates)} />
          }
        />
        <Route path="/allwalks" element={<AllWalks Walksprop={Walks} />} />
        <Route
          path="/signup"
          element={<SignUpForm addUser={(newUser) => handleAddUser(newUser)} />}
        />
      <Route 
      path="/walk/:id" 
      element={<IndividualWalk latitude={(latitude)} longitude={(longitude)} />} />
      </Routes>
    </div>
    </div>
  );
}
//I am not sure why we need to add the IndividualWalk and Userprofile here but is the only way that It works, help
export default App;
