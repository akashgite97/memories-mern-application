import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useField } from "formik";

const InputTextField = ({ name, value, onChange, label , autoFocus, type, half,required}) => {
 // const [field, mata] = useField(name);

  const configureTextField = {
    label: label,
    name: name,
    onChange: onChange,
    value: value,
    variant: "outlined",
    fullWidth: true,
    autoFocus:autoFocus,
    type:type,
    required:required
  };

  /* if (mata && mata.touched && mata.error) {
    configureTextField.error = true;
    configureTextField.helperText = mata.error;
  } */

  return(
  <Grid container xs={12} sm={half ? 6 : 12}>
<TextField {...configureTextField} />
  </Grid> )
};

export default InputTextField;
