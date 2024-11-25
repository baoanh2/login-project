import React, { useState } from "react";
import Profile from "./Profile";
import UserBookingList from "./UserBookingList";
import { Link, useNavigate } from "react-router-dom";

export default function UserPanel() {
  const [clicked, setClicked] = useState("profile");
  const handleClicked = (e) => {
    setClicked(e.target.value);
  };
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="user-panel">
        <div className="user-nav">
          <div>
            <button
              className="user-panel-btn"
              value="profile"
              onClick={handleClicked}
            >
              Profile
            </button>
            <button
              className="user-panel-btn"
              value="book-list"
              onClick={handleClicked}
            >
              Booking List
            </button>
            <button
              className="user-panel-btn"
              value="book-list"
              onClick={returnHome}
              style={{
                float: "right",
                marginRight: "2rem",
                color: "blue",
                borderBottomColor: "darkblue",
              }}
            >
              Return Home
            </button>
          </div>
        </div>
        <div className="user-body">
          {clicked == "profile" && <Profile />}
          {clicked == "book-list" && <UserBookingList />}
        </div>
      </div>
    </>
  );
}
