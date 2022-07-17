import {
  Button,
  Paper,
  Typography,
  Grid,
  Container,
  Avatar,
} from "@material-ui/core";
import React, { useState } from "react";
import InputTextField from "../Form/TextField";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";


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
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={`${classes.form} ${classes.root}`}  onSubmit={(e)=>handleSubmit(e)}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <InputTextField
                  name="firstName"
                  label="First Name"
                  half
                  value={firstName}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <InputTextField
                  name="lastName"
                  label="Last Name"
                  half
                  value={lastName}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </>
            )}
            <InputTextField
              type="email"
              name="email"
              label="Email"
              autoFocus
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
            <InputTextField
              type={isShowPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={password}
              onChange={(e) => handleChange(e)}
              required
            />
            {isSignUp && (
              <InputTextField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
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
            {isSignUp ? "SIGN UP" : "SIGN IN"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchAuthMode}>
                {isSignUp
                  ? "Already Have an account? Sign In"
                  : "Create an account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
