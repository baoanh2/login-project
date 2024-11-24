import React from "react";
import User from "../User/UserScreen";
import Unauthenticated from "./UnauthenticatedScreen";
import Navbar from "../Navbar";
import Admin from "../Admin/Admin";
export default function Home(props) {
  const { auth, name, role, handleLogout } = props;
  return (
    <>
      <div className="home-section">
        <Navbar name={name} handleLogout={handleLogout} auth={auth}></Navbar>
        {auth ? (
          <div style={{ height: "100vh", backgroundColor: "whitesmoke" }}>
            {role == "admin" && <Admin />}
            {role == "user" && <User />}
          </div>
        ) : (
          <div style={{ height: "100%" }}>{!role && <Unauthenticated />}</div>
        )}
      </div>
    </>
  );
}
