import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookingList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllBooking")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <table border={1} className="hotels-table">
      <tr>
        <th style={{ fontWeight: "bold" }}>BookID</th>
        <th style={{ fontWeight: "bold" }}>Start Date:</th>
        <th style={{ fontWeight: "bold" }}>End Date:</th>
        <th style={{ fontWeight: "bold" }}>Total Day:</th>
        <th style={{ fontWeight: "bold" }}>Total Amount:</th>
        <th style={{ fontWeight: "bold" }}>Status</th>
      </tr>
      {data.map((d, i) => {
        return (
          <tr key={i}>
            <th>{d.bookid}</th>
            <th>{d.startdate}</th>
            <th>{d.enddate}</th>
            <th>{d.totalday}</th>
            <th>{d.totalamount}</th>
            <th>{d.status}</th>
          </tr>
        );
      })}
    </table>
  );
}
