import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
export default function UpdateRoom() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    capacity: 0,
    phone: "",
    type: "",
    image: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/gethotel/" + id)
      .then((res) => {
        setValues({
          ...values,
          name: res.data[0].name,
          capacity: res.data[0].capacity,
          phone: res.data[0].phonenumber,
          type: res.data[0].type,
          image: res.data[0].image,
          description: res.data[0].description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const UpdateRoom = (e) => {
    e.preventDefault();
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
        .put("http://localhost:3001/update-hotel/" + id, values)
        .then((res) => {
          if (res.data.Status === "Success") {
            alert("Update Success!!");
            navigate("/");
            location.reload();
            console.log(res);
          } else {
            alert("Update error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form action="" onSubmit={UpdateRoom}>
        <div className="update-container">
          <div className="update-box">
            <div className="row-input">
              <div className="title">Update Hotel</div>
              <label htmlFor="name">Hotel name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter hotel name..."
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="input-addroom"
              />
            </div>
            <div className="row-input">
              <label htmlFor="capacity">Capacity:</label>
              <input
                type="number"
                name="capacity"
                placeholder="Enter capacity..."
                value={values.capacity}
                onChange={(e) =>
                  setValues({ ...values, capacity: e.target.value })
                }
                className="input-addroom"
              />
            </div>
            <div className="row-input">
              <label htmlFor="phone">Phone:</label>
              <input
                type="number"
                name="phone"
                placeholder="Enter phone number..."
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                className="input-addroom"
              />
            </div>
            <div className="row-input">
              <label htmlFor="type">Type:</label>
              <br />
              <select
                value={values.type}
                className="type-select"
                name="type"
                onChange={(e) => setValues({ ...values, type: e.target.value })}
              >
                <option value="Non-Deluxe">Non-Deluxe</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>
            <div className="row-input">
              <label htmlFor="image">Image:</label>
              <input
                name="image"
                placeholder="Enter url image..."
                value={values.image}
                onChange={(e) =>
                  setValues({ ...values, image: e.target.value })
                }
                className="input-addroom"
                rows={10}
              />
            </div>
            <div className="row-input">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                placeholder="Enter description..."
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                className="input-addroom"
                id="update-textarea"
                rows={7}
                cols={60}
              />
            </div>
            <button type="submit" id="updateroom-btn">
              Update room
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
