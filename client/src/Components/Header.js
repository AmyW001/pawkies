import React from "react";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Dog Walk Final Project 🐶</a>
        <form className="form-inline">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Log In
          </button>
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Sign Up
          </button>
        </form>
      </nav>
    </div>
  );
}
