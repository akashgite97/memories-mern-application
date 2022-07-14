import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const InputTextField = ({ name, value, onChange, label }) => {
  const [field, mata] = useField(name);

  const configureTextField = {
    ...field,
    label: label,
    name: name,
    onChange: onChange,
    value: value,
    variant: "outlined",
    fullWidth: true,
  };

  if (mata && mata.touched && mata.error) {
    console.log("enter");
    configureTextField.error = true;
    configureTextField.helperText = mata.error;
  }

  return <TextField {...configureTextField} />;
};

export default InputTextField;
