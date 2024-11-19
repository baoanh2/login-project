import { Link } from "react-router-dom";
import "./home.css";
import React from "react";
import UserDropDown from "./UserDropDown";

export default function Nav(props) {
  const { auth, handleLogout, name } = props;
  return (
    <div className="nav-section">
      <div className="navbar">
        <div>
          <h1>Bao Anh</h1>
        </div>
        <div>
          {auth ? (
            <>
              <div className="user-section">
                <UserDropDown
                  name={name}
                  handleLogout={handleLogout}
                ></UserDropDown>
              </div>
            </>
          ) : (
            <>
              <Link className="link" to="/register">
                Register
              </Link>
              <Link className="link" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
