import React, { useState, useEffect } from "react";
import ListOfHotel from "./ListOfHotel";
import "react-datepicker/dist/react-datepicker.css";

export default function User() {
  return (
    <>
      <div className="body-container">
        <ListOfHotel />
      </div>
    </>
  );
}
