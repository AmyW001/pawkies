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

function App() {
  const [loggedIn, setLoggedIn] = useState([]);
  const [Walks, setWalks] = useState([]);
  const [Users, setUsers] = useState([]);

  const dataToChatComponent = () => {
    //send data to chatComponent using this function
  };

  const handleLoggedInData = (loggedInData) => {
    //function for getting data from child component SignUpForm
    setLoggedIn((currentState) => [...currentState, loggedInData]);
  };

  const dataCheck = () => {
    console.log(loggedIn);
  };

  const handleAddWalk = (newWalk) => {
    setWalks((state) => [...state, newWalk]);
  };

  const handleAddUser = (newUser) => {
    setUsers((state) => [...state, newUser]);
  };

  return (
    <div>
      {/* <Header sessionProps={loggedIn} /> */}
      <button onClick={dataCheck}>Check loggedInData!</button>
      <Header sessionProps={loggedIn} />

      <Routes>
        <Route
          path="/user/:id"
          element={<UserProfile sessionProps={loggedIn} />}
        />
        <Route path="/" element={<HomePage />} />
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
            <AddWalkForm addWalk={(newWalk) => handleAddWalk(newWalk)} />
          }
        />
        <Route path="/allwalks" element={<AllWalks Walksprop={Walks} />} />
        <Route
          path="/signup"
          element={<SignUpForm addUser={(newUser) => handleAddUser(newUser)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
