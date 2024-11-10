import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toggleIcon, setToggleIcon] = useState("bi bi-eye-slash");
  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
    setToggleIcon(showPassword ? "bi bi-eye-slash" : "bi bi-eye");
    console.log(showPassword);
  };
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  const login = (e) => {
    e.preventDefault();
    const newErrors = Validation(values);
    setErrors(newErrors);
    if (errors.email == "" && errors.password == "") {
      axios.post("http://localhost:3001/login", values).then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          alert("Login Successful");
          navigate("/home");
        } else {
          alert("No accounts founded");
        }
      });
    }
  };
  return (
    <div className="login-box">
      <h1>Login</h1>
      {/* Email Input */}
      <div className="input-area">
        <div>
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            name="email"
            value={values.email}
            placeholder="Enter email..."
            onChange={handleChange}
          ></input>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
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
        </div>
      </div>
      <Link id="link" to="/register">
        Doesn't have an account yet?
      </Link>
      <button id="login-btn" onClick={login}>
        Login
      </button>
    </div>
  );
}
