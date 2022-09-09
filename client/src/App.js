import "./App.css";
import React, {useState} from "react";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header.js";
import HomePage from "./Components/HomePage.js";
import AddWalkForm from "./Components/AddWalkForm";
import AllWalks from "./Components/AllWalks";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";

function App() {

const [Walks, setWalks] = useState([]);
const [Users, setUsers] = useState([]);

const handleAddWalk = (newWalk) => {
  setWalks((state) => [...state, newWalk]);
}

const handleAddUser = (newUser) => {
  setUsers((state) => [...state, newUser]);
}

  return (
    <div className="App">
    <div>
      <Header />

      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/addwalkform" element={<AddWalkForm 
        addWalk={(newWalk)  => handleAddWalk (newWalk)}
      />} />
        <Route path= "/allwalks" element={<AllWalks
        Walksprop= {Walks}
      />}/>
        <Route path= "/signup" element={<SignUpForm
        addUser={(newUser) => handleAddUser (newUser)}
        />}/>
      </Routes>
    </div>
    </div>
  );
}

export default App;
