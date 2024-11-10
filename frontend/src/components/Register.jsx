import React, { useState } from "react";
import axios from "axios";
import Validation from "./RegisterValidation";
import { Navigate, useNavigate, Link } from "react-router-dom";
export default function Register() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toggleIcon, setToggleIcon] = useState("bi bi-eye-slash");
  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
    setToggleIcon(showPassword ? "bi bi-eye-slash" : "bi bi-eye");
    console.log(showPassword);
  };
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const submit = (e) => {
    e.preventDefault();
    const newErrors = Validation(values);
    setErrors(newErrors);
    if (
      errors.fullName === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.confPassword === ""
    ) {
      console.log("Insert Success!!");
      axios
        .post("http://localhost:3001/register", values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="register-box">
      <h1>Register</h1>
      {/* Full Name Input */}
      <div className="input-area">
        <div>
          <label htmlFor="name">Full Name:</label>
          <br></br>
          <input
            name="fullName"
            placeholder="Enter name..."
            onChange={handleChange}
            value={values.fullName}
          ></input>
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>
        {/* Email Input */}
        <div>
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            name="email"
            placeholder="Enter email..."
            value={values.email}
            onChange={handleChange}
          ></input>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        {/* Password Input */}
        <div>
          <label htmlFor="password">Password:</label>
          <br></br>
          <input
            className="input-password"
            type={showPassword == true ? "text" : "password"}
            name="password"
            placeholder="Enter password..."
            value={values.password}
            onChange={handleChange}
          ></input>
          <button className="eye-btn" onClick={toggleShowPassword}>
            <i className={toggleIcon}></i>
          </button>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confPassword">Confirm Password:</label>
          <br></br>
          <input
            className="input-password"
            type={showPassword == true ? "text" : "password"}
            name="confPassword"
            value={values.confPassword}
            placeholder="Enter confirm password..."
            onChange={handleChange}
          ></input>
          <button className="eye-btn" onClick={toggleShowPassword}>
            <i className={toggleIcon}></i>
          </button>
          {errors.confPassword && (
            <span className="error-message">{errors.confPassword}</span>
          )}
        </div>
      </div>
      <Link id="link" to="/">
        Already have an account ?
      </Link>
      <button id="register-btn" onClick={submit}>
        Create a Account
      </button>
    </div>
  );
}
