import React, { useState } from "react";
import ListOfHotel from "./ListOfHotel";
import { Link } from "react-router-dom";
export default function Unauthenticated() {
  return (
    <>
      <div className="welcome-container">
        <img className="logo" src="./src/components/Pages/images/logo.png" />
        <Link to="/login" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </>
  );
}
