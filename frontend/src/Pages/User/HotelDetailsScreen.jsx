import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import formatMoney from "../Utils/formatMoney";
export default function HotelDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  let [color, setColor] = useState("#a7421a99");
  useEffect(() => {
    axios
      .get("http://localhost:3001/gethotel/" + id)
      .then((res) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <ClockLoader
            color={color}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          {data.map((d, i) => {
            return (
              <div className="detail-body" key={i}>
                <div className="detail-container">
                  <div className="detail-image-container">
                    <img className="detail-image" src={d.image} alt=""></img>
                  </div>
                  <div className="detail-info-container">
                    <li style={{ fontSize: "30px", textWrap: "wrap" }}>
                      {d.name}
                    </li>
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
        </div>
      )}
    </>
  );
}
