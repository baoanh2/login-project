import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export default function Hotels() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/gethotels/")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  });

  const deleteHotel = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        alert("Delete Success!!!");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <table style={{ width: "90%" }} border={1} className="hotels-table">
      <tr>
        <th style={{ fontWeight: "bold", width: "10rem" }}>Hotel Name</th>
        <th style={{ fontWeight: "bold" }}>Capacity</th>
        <th style={{ fontWeight: "bold" }}>Phone number</th>
        <th style={{ fontWeight: "bold", width: "10rem" }}>Type</th>
        <th style={{ width: "15rem", fontWeight: "bold" }}>Image</th>
        <th style={{ fontWeight: "bold", width: "40rem" }}>Description</th>
        <th style={{ fontWeight: "bold" }}>Action</th>
      </tr>
      {data.map((d, i) => {
        return (
          <tr key={i}>
            <th>{d.name}</th>
            <th>{d.capacity}</th>
            <th>{d.phonenumber}</th>
            <th>{d.type}</th>
            <th style={{ width: "10rem", textWrap: "wrap" }}>{d.image}</th>
            <th style={{ width: "40rem", textWrap: "pretty" }}>
              {d.description}
            </th>
            <th
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "150px",
              }}
            >
              <Link to={`/update-hotel/${d.id}`} id="update-btn">
                Update
              </Link>
              <br />
              <button onClick={(e) => deleteHotel(d.id)} id="delete-btn">
                Delete
              </button>
            </th>
          </tr>
        );
      })}
    </table>
  );
}
