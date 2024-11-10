const Validation = (values) => {
  const errors = {};
  const nameRegex = /^[ a-zA-Z\-\’]+$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  //Full Name Validator
  if (values.fullName == "") {
    errors.fullName = "Full name is required";
  } else if (!nameRegex.test(values.fullName)) {
    errors.fullName = "Full name is invalid";
  } else {
    errors.fullName = "";
  }

  //Email Validator
  if (values.email == "") {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email is invalid";
  } else {
    errors.email = "";
  }

  //Password Validator
  if (values.password == "") {
    errors.password = "Password is required";
  } else if (!passRegex.test(values.password)) {
    errors.password =
      "Must contains uppercase, lowercase, number, special char, at least 8 char";
  } else if (values.confPassword && values.confPassword !== values.password) {
    errors.confPassword = "Password is not match";
  } else {
    errors.password = "";
    errors.confPassword = "";
  }

  //Confirm Password Validator
  return errors;
};
export default Validation;
