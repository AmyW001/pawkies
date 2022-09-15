import "./App.css";
import React, { useState, useEffect } from "react";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header/Header";
import HomePage from "./Components/Homepage/HomePage";
import MyChatComponent from "./Components/MyChatComponent.js";
import LoginForm from "./Components/LogInForm.js";
import AddWalkForm from "./Components/AddWalkForm";
import AllWalks from "./Components/Allwalks/AllWalks";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
<<<<<<< HEAD
import IndividualWalk from "./Components/Individual Walks/IndividualWalk";
import MapAPI from "./Components/Map API/MapAPI";
=======
import IndividualWalk from "./Components/IndividualWalk";
import Aboutus from "./Components/Aboutus/Aboutus";
>>>>>>> master

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [Walks, setWalks] = useState([]);
<<<<<<< HEAD
  const [Users, setUsers] = useState([]);
  
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const mapLatitude = latitude.map(l => console.log(l));
  console.log(mapLatitude);

  const [coordinates, setCoordinates] = useState({latitude: "", longitude: ""})

=======
  const [Users, setUsers] = useState();
>>>>>>> master

  const handleLoggedInData = (loggedInData) => {
    //function for getting data from child component SignUpForm
    setLoggedIn(loggedInData);
  };

  const handleAddWalk = (newWalk) => {
    setWalks((state) => [...state, newWalk]); //need to be making a fetch call to your database to get all the walks
  };

  const handleAddUser = (newUser) => {
    setUsers((state) => [...state, newUser]); //need to be making a fetch call to your database to get all the users
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
      {/* <Header sessionProps={loggedIn} /> */}

      <Header sessionProps={loggedIn} />

      <Routes>
        <Route
          path="/user/:username"
          element={<UserProfile sessionProps={loggedIn} />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/chat" element={<MyChatComponent />} />
        <Route
          path="/login"
          element={
            <LoginForm
              loggedInData={(loggedInData) => handleLoggedInData(loggedInData)}
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
<<<<<<< HEAD
      <Route 
      path="/walk/:id" 
      element={<IndividualWalk coordinates={(coordinates)} />} />
=======
        <Route path="/walk/:id" element={<IndividualWalk />} />
>>>>>>> master
      </Routes>

      <Route
      path="/mapAPI"
      element={
        <MapAPI/>
      }
      />
    </div>
    </div>
  );
}
//I am not sure why we need to add the IndividualWalk and Userprofile here but is the only way that It works, help
export default App;
