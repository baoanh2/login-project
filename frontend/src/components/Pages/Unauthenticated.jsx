import React from "react";
// import { Nav } from "./Nav.jsx";
import { Link } from "react-router-dom";
export default function Unauthenticated() {
  return (
    <>
      {/* <Nav /> */}
      <div>Unauthenticated</div>
      <Link to="/login">Login</Link>
    </>
  );
}
