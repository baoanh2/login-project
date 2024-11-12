import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";
import User from "./User";
import Unauthenticated from "./Unauthenticated";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
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
      <div>
        {auth ? (
          <div>
            {role == "admin" && <Admin handleDelete={handleDelete} />}
            {role == "user" && <User handleDelete={handleDelete} />}
          </div>
        ) : (
          <div>{!role && <Unauthenticated />}</div>
        )}
      </div>
    </>
  );
}
