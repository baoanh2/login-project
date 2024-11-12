import React from "react";
import axios from "axios";
export default function Admin() {
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
      <div>Admin</div>
      <button onClick={handleDelete}>Logout</button>
    </>
  );
}
