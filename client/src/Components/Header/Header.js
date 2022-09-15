import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css"

export default function Header(sessionProps) {
  const navigate = useNavigate();

  const returnHome = async (e) => {
    // handle form submit
    e.preventDefault();
    navigate(`/`);
  };

  return (
    <div>
      <nav className="top">
        <div className="topLeft">
        <a onClick={returnHome}>
          <i className="Icon fa-brands fa-square-facebook"></i>
          <i className="Icon fa-brands fa-square-instagram"></i>
          <i className="Icon fa-brands fa-square-twitter"></i>
          <i className="Icon fa-brands fa-square-youtube"></i>
        </a>
        </div>


        <div className="topCenter">
          <ul className="topList">
            <Link className="link" to="/">
            <li className="topListItem">HOME</li>
            </Link>
            <Link className="link" to="about-us">
            <li className="topListItem">ABOUT</li>
            </Link>
            <Link className="link" to="/addwalkform">
            <li className="topListItem">ADD A WALK</li>
            </Link>
          </ul>
        </div>

        <div className="topRight">
        {!sessionProps && (
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
        )}
        {sessionProps && (
          <form className="form-inline">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Log Out
            </button>
          </form>
        )}
        </div>
      </nav>
    </div>
  );
}
