import React, { useState, useEffect } from "react";
import axios from "axios";
import AddHotel from "./AddHotel";
import UsersList from "./UsersList";
import HotelList from "./HotelList";
import BookingList from "./BookingList";
import ClockLoader from "react-spinners/ClockLoader";

export default function Admin() {
  const [clicked, setClicked] = useState("booking");
  const handleClick = (e) => {
    setClicked(e.target.value);
  };

  const [loading, setLoading] = useState();
  let [color, setColor] = useState("#a7421a99");
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <ClockLoader
            color={color}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
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
            <button className="admin-btn" value="booking" onClick={handleClick}>
              Booking
            </button>
            <button className="admin-btn" value="hotels" onClick={handleClick}>
              Hotels
            </button>
            <button className="admin-btn" value="addroom" onClick={handleClick}>
              Add Hotel
            </button>
            <button className="admin-btn" value="user" onClick={handleClick}>
              Users
            </button>
          </div>
          {clicked == "hotels" && (
            <div className="admin-container">
              <HotelList />
            </div>
          )}
          {clicked == "addroom" && (
            <div className="admin-container">
              <AddHotel />
            </div>
          )}
          {clicked == "user" && (
            <div className="admin-container">
              <UsersList />
            </div>
          )}
          {clicked == "booking" && (
            <div className="admin-container">
              <BookingList />
            </div>
          )}
        </div>
      )}
    </>
  );
}
