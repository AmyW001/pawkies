import "./App.css";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header.js";
import HomePage from "./Components/HomePage.js";
import MyChatComponent from "./Components/MyChatComponent.js";
import LoginForm from "./Components/LogInForm.js";
import SignUpForm from "./Components/SignUpForm.js";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<MyChatComponent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
