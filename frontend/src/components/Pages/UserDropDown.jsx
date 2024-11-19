import React, { useState } from "react";
import "./home.css";

export default function UserDropDown(props) {
  const { handleLogout, name } = props;
  const [isDropped, setIsDropped] = useState(false);
  const toggleDropDown = () => {
    setIsDropped(!isDropped);
  };
  return (
    <div>
      <div className="dropdown">
        <button className="dropdown-btn" onClick={toggleDropDown}>
          <i className="bi bi-person-fill"></i>
          {name}
          <i className="bi bi-caret-down-fill"></i>
        </button>
        {isDropped ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}
