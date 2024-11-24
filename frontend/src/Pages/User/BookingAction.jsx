import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import formatMoney from "../Utils/formatMoney";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function Booking() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [totalMoney, setTotalMoney] = useState();
  const [day, setDay] = useState();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getdetail/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePayment = (e) => {
    e.preventDefault();
    if (!endDate || !startDate) {
      alert("Please enter Start Day and End Day to continue");
    } else {
      const diff = moment(endDate).diff(moment(startDate));
      const diffDuration = moment.duration(diff);
      setDay(diffDuration.days());
      handleShow();
    }
  };
  const booking = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/booking/", {
        userid: localStorage.getItem("userid"),
        startDate: moment(startDate).format("DD/MM/YYYY"),
        endDate: moment(endDate).format("DD/MM/YYYY"),
        day: day,
        totalMoney: formatMoney(data[0].rent * day),
      })
      .then((res) => {
        console.log(res);
        alert("Booking completed!!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {data.map((data, i) => {
        return (
          <div className="booking-body" key={i}>
            <div className="booking-container">
              <div className="booking-image-container">
                <img className="booking-image" src={data.image} alt=""></img>
              </div>
              <ul className="booking-info-container">
                <li style={{ fontSize: "30px", textWrap: "wrap" }}>
                  {data.name}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Max count: </span>
                  {data.capacity}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Phone number: </span>
                  {data.phonenumber}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Type: </span>
                  {data.type}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Rent per day: </span>
                  {formatMoney(data.rent)}
                </li>
                <div className="row-date">
                  <span style={{ fontWeight: "bold" }}>From: </span>
                  <DatePicker
                    className="date"
                    placeholderText="Start date..."
                    selectsStart
                    selected={startDate}
                    dateFormat="dd/MM/YYYY"
                    onChange={(date) => setStartDate(date)}
                    startDate={startDate}
                  />
                  <i class="bi bi-arrow-right"></i>
                  <DatePicker
                    className="date"
                    placeholderText="End date..."
                    selectsEnd
                    dateFormat="dd/MM/YYYY"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    endDate={endDate}
                    startDate={startDate}
                    minDate={startDate}
                  />
                </div>
                <Button id="pay-btn" variant="primary" onClick={handlePayment}>
                  Total Money
                </Button>
                <Link to="/" className="detail-link">
                  Return Home
                </Link>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Booking details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Hotels:</span>{" "}
                      {data.name}
                    </div>

                    <div>
                      <span style={{ fontWeight: "bold" }}>Rent per day:</span>{" "}
                      {formatMoney(data.rent)}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Day total:</span>{" "}
                      {day}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Money total:</span>{" "}
                      {formatMoney(data.rent * day)}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={booking}>
                      Book
                    </Button>
                  </Modal.Footer>
                </Modal>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}
