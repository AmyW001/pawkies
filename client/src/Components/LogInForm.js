import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ loggedInData }) {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    user_name: "",
    user_email: "",
    password: "",
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    // handle key presses
    const value = event.target.value;
    const name = event.target.name;

    setDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: details.user_name,
          user_email: details.user_email,
          password: details.password,
        }),
      });
      if (response.ok) {
        let data = await response.json();
        setLoggedInUser(data[0]);
        loggedInData(data[0]);
        navigate(`/user/${loggedInUser.user_name}`);
      } else {
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError("Network error:", err.message);
    }

    return null;
  };

  return (
    <div className="login-div">
      <h1 className="login-header">Log In</h1>

      <section id="login-section">
        <form className="login-form">
          <div className="container">
            <label for="name" className="col-6">
              Name
            </label>
            <input
              type="text"
              id="user_name"
              placeholder="Jane Doe"
              className="col-6"
              name="user_name"
              value={details.user_name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label for="club-name" className="col-4">
              Email
            </label>
            <input
              type="email"
              id="user_email"
              className="col-8"
              name="user_email"
              value={details.user_email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label for="password" className="col-6">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="col-6"
              name="password"
              value={details.password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-m"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
