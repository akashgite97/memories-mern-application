import React, { Suspense, useEffect } from "react";
import { CircularProgress, Container, Grid, Grow } from "@material-ui/core";
import { getAllPosts } from "../../redux/slices/postSlice";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
const PostForm = React.lazy(() => import("../Form/Form"));
const Posts = React.lazy(() => import("../Posts/Posts"));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spaceing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PostForm />
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </Suspense>
  );
};

export default Home;
