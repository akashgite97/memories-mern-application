import React, { Suspense, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  Button,
} from "@material-ui/core";
import { getPostBySearch } from "../../redux/slices/postSlice";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Paginate from "../Pagination/Pagination";
import ChipInput from "material-ui-chip-input";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import InputTextField from "../InputFileds/TextField";
const PostForm = React.lazy(() => import("../Form/Form"));
const Posts = React.lazy(() => import("../Posts/Posts"));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [query] = useSearchParams()
  const query = useQuery();
  const page = query.get('page') || 1
  const searchQury = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleTagAdd = (tag) => setTags([...tags, tag]);

  const handleTagDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      //searchPost action
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags || 'none'}`)
    } else {
      navigate("/");
    }
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spaceing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appSearchBar}
                position="static"
                color="inherit"
              >
                <InputTextField
                  name="search"
                  label="Search Memories"
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0px" }}
                  value={tags}
                  onAdd={handleTagAdd}
                  onDelete={handleTagDelete}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
              <PostForm />
              <Paper elevation={4} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Suspense>
  );
};

export default Home;
