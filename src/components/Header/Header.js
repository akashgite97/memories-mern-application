import React, { useState, useEffect } from "react";
import memories from "../../assets/memories.png";
import {
  AppBar,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Toolbar,
  Button,
  Avatar,
  Container,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";
import i18n from "../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { languageList } from "../../constant/constant";
import { user } from "../../util";

const Header = () => {
  const [lang, setLanguage] = useState("en");
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  const handleLogout = () =>{
    dispatch(logout())
    navigate('/auth')
  }
  useEffect(() => {
    window.localStorage.removeItem("i18nextLng");
  }, [lang]);

  return (
    <Container maxWidth="xl">
      <AppBar
        className={classes.appBar}
        position="relative"
        justifyContent="spaceBetween"
        color="inherit"
      >
        <Grid container justifyContent="space-between" alignItems="stretch">
          <Grid
            item
            justify="flex-start"
            className={classes.headerLeft}
            xs={12}
            sm={4}
          >
            <Typography className={classes.heading} variant="h2" align="left">
              Memories
            </Typography>
            <img
              className={classes.image}
              src={memories}
              alt="memories"
              height="50"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex" }}
            alignItems="center"
            justify="center"
            className={classes.headerRight}
          >
            {user ? (
              <Toolbar className={classes.toolBar}>
                <div className={classes.profile}>
                  <Avatar src={user.result.imageUr} alt={user.result.name} />
                  <Typography variant="h6" className={classes.userName}>
                    {user.result.name}
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.logout}
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </div>
              </Toolbar>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/auth")}
              >
                Log In
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid sm={1} item>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Age"
              onChange={(e) => handleLanguageChange(e)}
            >
              {languageList.map((data, index) => (
                <MenuItem key={index} value={data.value}>
                  {data.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </AppBar>
    </Container>
  );
};

export default Header;
