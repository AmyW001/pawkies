import "./App.css";
import React, {useState} from "react";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header.js";
import HomePage from "./Components/HomePage.js";
import AddWalkForm from "./Components/AddWalkForm";
import AllWalks from "./Components/AllWalks";
import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {

const [Walks, setWalks] = useState([]);

const handleAddWalk = (newWalk) => {
  setWalks((state) => [...state, newWalk]);
}

  return (
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
      </Routes>
    </div>
  );
}

export default App;
