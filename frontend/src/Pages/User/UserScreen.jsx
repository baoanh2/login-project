import React, { useState, useEffect } from "react";
import HotelList from "./HotelList";
import "react-datepicker/dist/react-datepicker.css";

export default function User() {
  return (
    <>
      <div className="body-container">
        <HotelList />
      </div>
    </>
  );
}
