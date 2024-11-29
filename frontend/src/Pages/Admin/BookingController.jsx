import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingList from "./BookingList";
export default function BookingController() {
  const [data, setData] = useState([]);
  function loadingBookingList() {
    useEffect(() => {
      axios
        .get("http://localhost:3001/getAllBooking")
        .then((res) => {
          setData(res.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  }

  return (
    <>
      <BookingList data={data} loadingBookingList={loadingBookingList} />
    </>
  );
}
