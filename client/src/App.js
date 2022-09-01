import "./App.css";
import UserProfile from "./Components/UserProfile.js";
import { Routes, Route, Link } from "react-router-dom";
import { WeavyClient, WeavyProvider, Messenger } from "@weavy/uikit-react";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  const getToken = async (e) => {
    // e.preventDefault();

    try {
      let response = await fetch("/messages/:id", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        setToken(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log("Network error:", err.message);
    }

    return null;
  };

  const weavyClient = new WeavyClient({
    url: "{dogappfinalproject.weavy}",
    tokenFactory: getToken,
  });

  return (
    <div>
      <h1>Hello I'm working!</h1>

      <WeavyProvider client={weavyClient}>
        <Messenger />
      </WeavyProvider>

      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/messages:id" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
