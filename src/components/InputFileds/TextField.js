import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const InputTextField = ({ name, value, onChange, label , autoFocus, type, half,required}) => {
 // const [field, mata] = useField(name);
 const {t} = useTranslation()

  const configureTextField = {
    label: t(label),
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
