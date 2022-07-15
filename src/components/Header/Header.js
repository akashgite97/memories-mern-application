import React, { useState, useEffect } from "react";
import memories from "../../assets/memories.png";
import {
  AppBar,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import i18n from "../../i18n";
import useStyles from "../../styles";
import { languageList } from "../../mock-data/mockConstant";

const Header = () => {
  const [lang, setLanguage] = useState("en");
  const classes = useStyles();
  
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  useEffect(() => {
    setLanguage("en");
    localStorage.clear();
  }, [lang]);

  return (
    <div>
      <AppBar
        className={classes.appBar}
        position="relative"
        justifyContent="spaceBetween"
        color="inherit"
      >
        <div className={classes.headerLeft}>
          <Typography className={classes.heading} variant="h2" align="left">
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="50"
          />
        </div>
        <FormControl className={classes.headerRight}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="Age"
            onChange={handleLanguageChange}
          >
            {languageList.map((data, index) => (
              <MenuItem key={index} value={data.value}>
                {data.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AppBar>
    </div>
  );
};

export default Header;
