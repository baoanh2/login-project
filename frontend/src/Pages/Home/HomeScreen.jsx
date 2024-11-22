import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../User/UserScreen";
import Unauthenticated from "./UnauthenticatedScreen";
import Navbar from "../Navbar";
import Admin from "../Admin/Admin";
export default function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setRole(res.data.role);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
