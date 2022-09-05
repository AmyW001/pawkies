import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState();
  // const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async (e) => {
      try {
        let response = await fetch(window.location.pathname, {
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
      {user && (
        <div className="user-main-div">
          <h1 className="user-header">Hi! My name is {user.user_name}!</h1>

          <img
            className="user-dog-img"
            src="https://images.unsplash.com/photo-1554020997-47f84383f66a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          ></img>

          <div className="user-second-div">
            <h3>I'm based in {user.location}</h3>
          </div>

          <div>
            <h2>My dog is:</h2>
            <h5 className="user-header-5">{user.user_dog_name}</h5>
            <p>
              More about {user.user_dog_name}: {user.user_dog_description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
