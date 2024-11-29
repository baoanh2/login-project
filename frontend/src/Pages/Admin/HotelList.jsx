import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import DeletePopup from "./DeletePopup";
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
  }, []);

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
    <>
      <TableContainer
        component={Paper}
        className="hotel-list-container"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Hotel List</h1>
        <Table aria-label="simple table" style={{ width: "90%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.capacity}</TableCell>
                <TableCell>{row.phonenumber}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell style={{ minWidth: "10rem" }}>{row.image}</TableCell>
                <TableCell style={{ minWidth: "25rem" }}>
                  {row.description}
                </TableCell>
                <TableCell>
                  <Link to={`/update-hotel/${row.id}`} id="update-btn">
                    Update
                  </Link>
                  <br />
                  <br />
                  <DeletePopup
                    name={row.name}
                    id={row.id}
                    deleteHotel={deleteHotel}
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
