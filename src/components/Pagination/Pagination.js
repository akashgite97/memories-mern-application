import React, { useEffect } from "react";
import useStyles from "./styles";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../redux/slices/postSlice";
import { useSelector, useDispatch } from "react-redux";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (page) {
      dispatch(getAllPosts(page));
    }
  }, [dispatch, page]);
  return (
    <div>
      <Pagination
        className={{ ul: classes.ul }}
        count={Number(numberOfPages)}
        page={Number(page)}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/post?page=${item.page}`}
          />
        )}
      />
    </div>
  );
};

export default Paginate;
