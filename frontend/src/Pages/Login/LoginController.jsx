import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import Login from "./Login";

export default function LoginController() {
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
            console.log("accessible");
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
    <>
      <Login
        toggleShowPassword={toggleShowPassword}
        handleChange={handleChange}
        login={login}
        values={values}
        setShowIcon={setShowIcon}
        setShowPassword={setShowPassword}
        email={values.email}
        password={values.password}
        emailErrors={errors.email}
        passwordErrors={errors.password}
        showIcon={showIcon}
        showPassword={showPassword}
      />
    </>
  );
}
