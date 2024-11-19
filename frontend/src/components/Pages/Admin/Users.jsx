import React, { useState, useEffect } from "react";

export default function User() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/getusers/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <table border={1} className="user-table">
      <tr>
        <th style={{ fontWeight: "600" }}>Full Name</th>
        <th style={{ fontWeight: "600" }}>Email</th>
        <th style={{ fontWeight: "600" }}>Password</th>
        <th style={{ fontWeight: "600" }}>Role</th>
      </tr>
      {data.map((d, i) => {
        return (
          <tr key={i}>
            <th>{d.fullname}</th>
            <th>{d.email}</th>
            <th>{d.password}</th>
            <th>{d.role}</th>
          </tr>
        );
      })}
    </table>
  );
}
