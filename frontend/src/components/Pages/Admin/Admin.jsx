import React, { useState } from "react";
import axios from "axios";
import AddRoom from "./AddRoom";
import Users from "./Users";
import Hotels from "./HotelList";
import BookingList from "./BookingList";

export default function Admin() {
  const [clicked, setClicked] = useState("booking");
  const [showCss, setShowCss] = useState(false);
  const handleClick = (e) => {
    setClicked(e.target.value);
    setShowCss(!showCss);
  };
  const css = {
    border: { borderBottom: "5px solid #a7421a65", color: "black" },
  };
  return (
    <>
      <div className="body-container">
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: 700,
            color: "#a7421a65",
          }}
        >
          Admin Panel
        </div>
        <div className="nav-admin">
          <button
            style={css.border}
            className="admin-btn"
            value="booking"
            onClick={handleClick}
          >
            Booking
          </button>
          <button
            // style={showCss && css}
            className="admin-btn"
            value="hotels"
            onClick={handleClick}
          >
            Hotels
          </button>
          <button
            // style={clicked == "addroom" && css}
            className="admin-btn"
            value="addroom"
            onClick={handleClick}
          >
            Add Room
          </button>
          <button
            // style={clicked == "user" && css}
            className="admin-btn"
            value="user"
            onClick={handleClick}
          >
            Users
          </button>
        </div>
        {clicked == "hotels" && (
          <div className="admin-container">
            <Hotels />
          </div>
        )}
        {clicked == "addroom" && (
          <div className="admin-container">
            <AddRoom />
          </div>
        )}
        {clicked == "user" && (
          <div className="admin-container">
            <Users />
          </div>
        )}
        {clicked == "booking" && (
          <div className="admin-container">
            <BookingList />
          </div>
        )}
      </div>
    </>
  );
}
