import {
  Button,
  Paper,
  Typography,
  Grid,
  Container,
  Avatar,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { authTile } from "./authConstant";
import InputTextField from "../InputFileds/TextField";
import { useTranslation } from "react-i18next";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setSignup] = useState(false);
  const [isShowPassword, setShowPassword] = useState(true);
  const [data, setData] = useState(initialState);
  const { email, password, confirmPassword, firstName, lastName } = data;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {t} = useTranslation()
  

  const switchAuthMode = () => {
    setSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(isSignUp){
     dispatch(signup(data))
    }else{
     dispatch(signin(data)).then(()=>{
      navigate('/')
     })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" alignItems="center">
          {isSignUp ? t(authTile.signup) : t(authTile.signin)}
        </Typography>
        <form className={`${classes.form} ${classes.root}`}  onSubmit={(e)=>handleSubmit(e)}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <InputTextField
                  name={authTile.firstName}
                  label={authTile.firstName}
                  half
                  value={firstName}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <InputTextField
                  name={authTile.lastName}
                  label={authTile.lastName}
                  half
                  value={lastName}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </>
            )}
            <InputTextField
              type="email"
              name={authTile.email}
              label={authTile.email}
              autoFocus
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
            <InputTextField
              type={isShowPassword ? "text" : "password"}
              name={authTile.password}
              label={authTile.password}
              value={password}
              onChange={(e) => handleChange(e)}
              required
            />
            {isSignUp && (
              <InputTextField
                type="password"
                name={authTile.confirmPassword}
                label={authTile.confirmPassword}
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
              />
            )}
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            className={classes.buttonSubmit}
            onClick={ (e)=>handleSubmit(e)}
           
          >
            {isSignUp ? t(authTile.signup) : t(authTile.signin)}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchAuthMode}>
                {isSignUp
                  ? t(authTile.alreadyHaveAccount)
                  : t(authTile.createAccount)
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
