import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
export default function HotelDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const formatMoney = (money) => {
    let rent = new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
    return rent;
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/getdetail/" + id)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {data.map((d, i) => {
        return (
          <div className="detail-body" key={i}>
            <div className="detail-container">
              <div className="detail-image-container">
                <img className="detail-image" src={d.image} alt=""></img>
              </div>
              <div className="detail-info-container">
                <li style={{ fontSize: "30px", textWrap: "wrap" }}>{d.name}</li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Max count: </span>
                  {d.capacity}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Phone number: </span>
                  {d.phonenumber}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Type: </span>
                  {d.type}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Rent: </span>
                  {formatMoney(d.rent)}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Description: </span>
                  <br />
                  {d.description}
                </li>
                <Link to="/" className="detail-link">
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
