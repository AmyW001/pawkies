import "./App.css";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header.js";
import HomePage from "./Components/HomePage.js";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <div>
      <Header />

      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
