import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from "axios";

export default function Register() {
  const [role, setRole] = useState("user");
  const [values, setValues] = useState({
    key: "",
    fullName: "",
    email: "",
    password: "",
    confPassword: "",
    role: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState("bi bi-eye-slash");
  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword);
    setShowIcon(showPassword ? "bi bi-eye" : "bi bi-eye-slash");
  };

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: role,
      })
      .then((res) => {
        if (res.data.Status == "Success") {
          alert("Register Success!!");
          navigate("/login");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = (e) => {
    e.preventDefault();
    const newErrors = Validation(values);
    setErrors(newErrors);
    if (role === "admin" && errors.key) {
      alert(errors.key);
    } else if (
      errors.fullName == "" &&
      errors.email == "" &&
      errors.password == "" &&
      errors.confPassword == "" &&
      errors.key == "" &&
      role == "admin"
    ) {
      register();
    } else if (
      errors.fullName == "" &&
      errors.email == "" &&
      errors.password == "" &&
      errors.confPassword == "" &&
      role == "user"
    ) {
      console.log(role);
      register();
    }
  };

  return (
    <div className="register-box">
      <h1>Register</h1>
      {/* Full Name Input */}
      <div className="input-area">
        <div className="checkbox-wrapper">
          <h3>Sign in As:</h3>
          <div>
            <label>
              <input
                id="checkbox-admin"
                type="checkbox"
                name="admin"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <span>Admin</span>
            </label>
          </div>
          <div>
            <label>
              <input
                id="checkbox-admin"
                name="user"
                value="user"
                type="checkbox"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              <span>User</span>
            </label>
          </div>
        </div>
        {/* Secret Key Input */}
        {role == "admin" && (
          <div>
            <label htmlFor="key">Secret Key:</label>
            <br></br>
            <input
              name="key"
              placeholder="Enter Secret Key..."
              value={values.key}
              onChange={handleChange}
            ></input>
            {errors.key && <div className="error-message">{errors.key}</div>}
          </div>
        )}

        <div>
          <label htmlFor="fullName">Full Name:</label>
          <br></br>
          <input
            name="fullName"
            placeholder="Enter name..."
            onChange={handleChange}
            value={values.fullName}
          ></input>
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
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
          {errors.email && <div className="error-message">{errors.email}</div>}
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
          ></input>
          <button className="eye-btn" onClick={toggleShowPassword}>
            <i className={showIcon}></i>
          </button>
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confPassword">Confirm Password:</label>
          <br></br>
          <input
            className="input-password"
            type={showPassword ? "text" : "password"}
            name="confPassword"
            value={values.confPassword}
            placeholder="Enter confirm password..."
            onChange={handleChange}
          ></input>
          <button className="eye-btn" onClick={toggleShowPassword}>
            <i className={showIcon}></i>
          </button>
          {errors.confPassword && (
            <div className="error-message">{errors.confPassword}</div>
          )}
        </div>
      </div>
      <Link id="link" to="/login">
        Already have an account ?
      </Link>
      <button id="register-btn" onClick={submit}>
        Create a Account
      </button>
    </div>
  );
}
