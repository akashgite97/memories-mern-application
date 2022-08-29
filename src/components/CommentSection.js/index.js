import { Button, Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../redux/slices/postSlice";
import { user } from "../../util";
import InputTextField from "../InputFileds/TextField";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const {user} = useSelector(state => state.auth)

  const handleCommentClick = async () => {
    const finalComment = `${user.result.name} : ${comment}`;
    const commentsObj = { finalComment, id: post._id };
    const newComment = await dispatch(commentPost(commentsObj));
    setComments(newComment.payload.data.comments);
    setComment('');
    commentsRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <>
      <div className={classes.commentsInnerContainer}>
        {user && (
        <div style={{ width: "70%" }}>
          <Typography variant="h6" gutterBottom>
            Write a Comment
          </Typography>
          <InputTextField
            name="comment"
            label="Comment"
            variant="outlined"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            fullWidth
            color="primary"
            disabled={!comment}
            onClick={handleCommentClick}
          >
            Comment
          </Button>
        </div>
      )}
      <Typography gutterBottom variant="h6" style={{marginTop:"20px"}}>
          Comments:
        </Typography>
        {comments?.map((comment, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            {comment}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>

    </>
  );
};

export default CommentSection;
