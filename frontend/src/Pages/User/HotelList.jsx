import axios from "axios";
import React, { useEffect, useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

export default function ListOfHotel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  let [color, setColor] = useState("#a7421a99");
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gethotels")
      .then((res) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setData(res.data);
        setSearchItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const filter = (e) => {
    setSearchItems(
      data.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
  };
  return (
    <>
      <div className="list-container">
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
          <div className="hotel-items">
            <div className="search-container">
              <input
                id="search-bar"
                onChange={filter}
                placeholder="Search hotel..."
              />
            </div>
            {searchItems.map((d, i) => {
              return (
                <div key={i} className="hotel-item">
                  <ul>
                    <div className="img-container">
                      <img className="img" src={d.image} alt=""></img>
                    </div>
                    <div className="info-container">
                      <li style={{ fontSize: "30px", textWrap: "wrap" }}>
                        {d.name}
                      </li>
                      <li>
                        <span style={{ fontWeight: "bold" }}>Max count: </span>
                        {d.capacity}
                      </li>
                      <li>
                        <span style={{ fontWeight: "bold" }}>
                          Phone number:
                        </span>
                        {d.phonenumber}
                      </li>
                      <li>
                        <span style={{ fontWeight: "bold" }}>Type: </span>
                        {d.type}
                      </li>
                      <Link to={`/getdetail/${d.id}`} className="detail-btn">
                        View Details
                      </Link>
                      <Link to={`/booking/${d.id}`} className="booking-btn">
                        Booking
                      </Link>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
