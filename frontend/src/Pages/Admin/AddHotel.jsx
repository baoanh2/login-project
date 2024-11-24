import React, { useState } from "react";
import "./admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddRoom() {
  const [values, setValues] = useState({
    name: "",
    capacity: 0,
    phone: 0,
    rent: 0,
    type: "",
    image: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const addRoom = () => {
    if (
      values.name == "" ||
      values.capacity == 0 ||
      values.phone == 0 ||
      values.rent == 0 ||
      values.image == "" ||
      values.type == "" ||
      values.description == ""
    ) {
      alert("Please fill in all the field below!!!");
    } else {
      axios
        .post("http://localhost:3001/addroom", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/");
            alert("Add Success!!");
            console.log(res);
          } else {
            alert("ADD ERROR!!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="add-container">
        <div className="add-box">
          <h2 style={{ textAlign: "center" }}>Add Hotel</h2>
          <div className="row-input">
            <label htmlFor="name">Hotel name:</label>
            <br />
            <input
              name="name"
              placeholder="Enter hotel name..."
              onChange={handleChange}
              className="input-addroom"
            />
          </div>
          <div className="row-input">
            <label htmlFor="capacity">Capacity:</label>
            <br />
            <input
              type="number"
              name="capacity"
              placeholder="Enter capacity..."
              onChange={handleChange}
              className="input-addroom"
            />
          </div>
          <div className="row-input">
            <label htmlFor="phone">Phone:</label>
            <br />
            <input
              type="number"
              name="phone"
              placeholder="Enter phone number..."
              onChange={handleChange}
              className="input-addroom"
            />
          </div>
          <div className="row-input">
            <label htmlFor="phone">Rent per day:</label>
            <br />
            <input
              type="number"
              name="rent"
              placeholder="Enter rent..."
              onChange={handleChange}
              className="input-addroom"
            />
          </div>
          <div className="row-input">
            <label htmlFor="type">Type:</label>
            <br />
            <select
              placeholder="Select type..."
              className="type-select"
              name="type"
              onChange={handleChange}
            >
              <option selected disabled>
                Select type...
              </option>
              <option value="Non-Deluxe">Non-Deluxe</option>
              <option value="Deluxe">Deluxe</option>
            </select>
          </div>
          <div className="row-input">
            <label htmlFor="image">Image:</label>
            <br />
            <input
              name="image"
              placeholder="Enter url image..."
              onChange={handleChange}
              className="input-addroom"
            />
          </div>
          <div className="row-input">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              placeholder="Enter description..."
              value={values.description}
              className="input-addroom"
              id="update-textarea"
              rows={7}
              cols={60}
              onChange={handleChange}
            />
          </div>
          <button onClick={addRoom} id="addroom-btn">
            Add room
          </button>
        </div>
      </div>
    </>
  );
}
