import "./App.css";
import React, { Suspense, useEffect } from "react";
import { Container, Grid, Grow, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllPosts } from "./redux/slices/postSlice";
const PostForm = React.lazy(() => import("./components/Form/Form"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const Header = React.lazy(() => import("./components/Header/Header"));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        {error &&
          toast.error(
            error !== "" ? error : "Something went wrong! Please try again"
          )}
        <Header />
        <Container maxWidth="lg">
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
          <ToastContainer />
        </Container>
      </Suspense>
    </>
  );
}

export default App;
