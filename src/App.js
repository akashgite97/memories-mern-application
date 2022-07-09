import './App.css';
import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grid, Grow } from '@material-ui/core';
import memories from './images/memories.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './store/actions/post-actions';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { changeLanguage } from './store/actions/locale-action';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts=useSelector(state=>state.posts)
  
  useEffect(() => {
    dispatch(getPosts());
    dispatch(changeLanguage("hn"))
  }, [dispatch]);

  return (
    <>
    <Container maxWidth='lg'>
      <ErrorMessage />
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='50'
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent='space-between'
            alignItems='stretch'
            spaceing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </>
  );
}

export default App;
