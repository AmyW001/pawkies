import "./App.css";
import UserProfile from "./Components/UserProfile.js";
import Header from "./Components/Header.js";
import HomePage from "./Components/HomePage.js";
import { Routes, Route, Link } from "react-router-dom";
import { WeavyClient, WeavyProvider, Messenger } from "@weavy/uikit-react";
import { useState } from "react";

function App() {
  // const [token, setToken] = useState("");

  // const getToken = async (e) => {
  //   // e.preventDefault();

  //   try {
  //     let response = await fetch("/token/:id", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       let data = await response.json();
  //       setToken(data);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log("Network error:", err.message);
  //   }

  //   return null;
  // };

  // const weavyClient = new WeavyClient({
  //   url: "{dogappfinalproject.weavy.io}",
  //   tokenFactory: getToken,
  // });

  return (
    <div>
      <Header />

      {/* <WeavyProvider client={weavyClient}>
        <Messenger />
      </WeavyProvider> */}

      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
