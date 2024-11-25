import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState("bi bi-eye-slash");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
    setShowIcon(showPassword ? "bi bi-eye-slash" : "bi bi-eye");
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  const login = () => {
    const newErrors = Validation(values);
    setErrors(newErrors);
    if (errors.email == "" && errors.password == "") {
      axios
        .post("http://localhost:3001/login", values)
        .then((res) => {
          if (res.data.Status == "Success") {
            alert("Login Success");
            navigate("/");
          } else {
            alert(res.data.Error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="login-box">
      <h1>Login</h1>
      <div className="input-area">
        {/* Email Input */}
        <div>
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            name="email"
            className="input-email"
            value={values.email}
            placeholder="Enter email..."
            onChange={handleChange}
          />
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password..."
            value={values.password}
            onChange={handleChange}
          />
          <button className="eye-btn" onClick={toggleShowPassword}>
            <i className={showIcon}></i>
          </button>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
      </div>
      {console.log(errors.password)}
      <Link id="link" to="/register">
        Doesn't have an account yet?
      </Link>
      <button id="login-btn" onClick={login}>
        Login
      </button>
    </div>
  );
}
