import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async (e) => {
      try {
        let response = await fetch(`/user/1`, {
          method: "GET",
        });
        if (response.ok) {
          let data = await response.json();
          setUser(data[0]);
        } else {
          console.log(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        console.log(`Network error:", err.message`);
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

      {user && (
        <div className="container">
          <div className="row align-items-start">
            <h1>{user.user_name}</h1>
            <h3>{user.location}</h3>
          </div>

          <div>
            <h2>My dogs:</h2>
            <h5>{user.user_dog_name}</h5>
            <p>{user.user_dog_description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
