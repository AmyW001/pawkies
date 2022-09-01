import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async (e) => {
      try {
        let response = await fetch(`/user/:id`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log("success", data);
          setUser(data);
        } else {
          setError(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        setError("Network error:", err.message);
      }
    };

    loadPage();
  }, []);

  return (
    <div>
      <h1>User Profile page is working!</h1>
      <img
        className="user-dog-img"
        src="https://images.unsplash.com/photo-1554020997-47f84383f66a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
      ></img>
      {/* This will be imported from database eventually */}

      <div className="container">
        <div className="row align-items-start">
          <h1>user.username</h1>
          <h3>user.location</h3>
        </div>

        <div>
          <h2>My dogs:</h2>
          <h5>user.dog_name</h5>
          <p>user.dog_description</p>
        </div>
      </div>

      {/* <div id="messenger" className="weavy-div"></div> */}
    </div>
  );
}
