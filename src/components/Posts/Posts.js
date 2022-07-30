import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import {Grid, CircularProgress} from '@material-ui/core'
import { useSelector } from 'react-redux';

const Posts = () => {
 const classes = useStyles();
 const posts=useSelector(state=>state.posts)
 console.log(posts)
 
  return (
    posts.isLoading ? <div className={classes.alignCenter}><CircularProgress /></div> :(
     <Grid conatiner className={classes.mainContainer} alignItems="stretch" spacing={3}>
       {posts && posts.posts.data && posts.posts.data.map((post)=>(
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={5}  className={classes.marginLeft} >
          <Post post={post} />
        </Grid>
        
       ))}
     </Grid>
    )
  );
};

export default Posts;
