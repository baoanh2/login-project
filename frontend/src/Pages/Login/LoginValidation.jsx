function Validation(values) {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (values.email == "") {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email is invalid";
  } else {
    errors.email = "";
  }

  if (values.password == "") {
    errors.password = "Password is required";
  } else {
    errors.password = "";
  }
  return errors;
}
export default Validation;
