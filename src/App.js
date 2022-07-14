import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grid, Grow, MenuItem, Select, FormControl, CircularProgress } from '@material-ui/core';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './store/actions/post-actions';
import { useTranslation } from "react-i18next";
import i18n from './i18n';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { languageList } from './components/mock-data/mockConstant';
import PostForm from './components/Form/Form'

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [lang,setLanguage]=useState("en")
 // const {t} = useTranslation(['common'])
  const {hasError, errorMessage} = useSelector((state) => state.globalError);
  const handleLanguageChange =(e)=>{
   i18n.changeLanguage(e.target.value)
   setLanguage(e.target.value)
  }
  
  useEffect(() => {
    dispatch(getPosts());
    setLanguage("en")
    localStorage.clear()
  }, [dispatch]);

  return (
    <>
    <Suspense fallback={<CircularProgress />}>
    {hasError && toast.error(errorMessage.message!=="" ? errorMessage.message : "Something went wrong! Please try agin")}
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='relative' justifyContent="spaceBetween" color='inherit'>
        <div className={classes.headerLeft}>
        <Typography className={classes.heading} variant='h2' align='left'>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='50'
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
   {languageList.map((data,index)=>(
    <MenuItem key={index} value={data.value}>{data.description}</MenuItem>
  ))} 
    </Select>
</FormControl>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent='space-between'
            alignItems='stretch'
            spaceing={3}
          >
            <Grid item xs={12} sm={7} >
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PostForm />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <ToastContainer />
    </Container>
    </Suspense>
    </>
  );
}

export default App;
