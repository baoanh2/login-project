import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CancelPopup from "./CancelPopup";
export default function UserBookingList() {
  const userid = localStorage.getItem("userid");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUserBooking/" + userid)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cancelBooked = (bookid) => {
    axios
      .put("http://localhost:3001/cancel-booking/" + bookid)
      .then((res) => {
        if (res.data.Status === "Cancel Success") {
          alert("Cancel Success!!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            paddingBottom: "20px",
            borderBottom: "1px solid black",
          }}
        >
          Booking List
        </h1>
        <Table aria-label="simple table" style={{ width: "90%" }}>
          <TableHead>
            <TableRow>
              <TableCell>BookID</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Day</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.bookid}>
                <TableCell component="th" scope="row">
                  {row.bookid}
                </TableCell>
                <TableCell>{row.startdate}</TableCell>
                <TableCell>{row.enddate}</TableCell>
                <TableCell>{row.totalday}</TableCell>
                <TableCell>{row.totalamount}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <CancelPopup
                    startdate={row.startdate}
                    enddate={row.enddate}
                    id={row.bookid}
                    cancelBooked={cancelBooked}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
