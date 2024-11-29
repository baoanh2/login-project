import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function BookingList() {
  // const { data, loadingBookingList } = props;
  // loadingBookingList();
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
    <>
      <TableContainer
        component={Paper}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Booking List</h1>
        <Table aria-label="simple table" style={{ width: "90%" }}>
          <TableHead>
            <TableRow>
              <TableCell>BookID</TableCell>
              <TableCell>UserID</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Day</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.bookid}>
                <TableCell component="th" scope="row">
                  {row.bookid}
                </TableCell>
                <TableCell>{row.userid}</TableCell>
                <TableCell>{row.startdate}</TableCell>
                <TableCell>{row.enddate}</TableCell>
                <TableCell>{row.totalday}</TableCell>
                <TableCell>{row.totalamount}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
