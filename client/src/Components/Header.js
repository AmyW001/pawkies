import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

export default function Header() {
  const navigate = useNavigate();

  const returnHome = async (e) => {
    // handle form submit
    e.preventDefault();
    navigate(`/`);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand" onClick={returnHome}>
          Dog Walk Final Project 🐶
        </a>
        <form className="form-inline">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Log In
          </button>
          <button className="btn btn-secondary my-2 my-sm-0">
            <Link to="/signup" class="link success">
              {" "}
              Sign Up
            </Link>
          </button>
        </form>
      </nav>
    </div>
  );
}
