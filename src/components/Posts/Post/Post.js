import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,

} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from 'moment'
import { useDispatch } from "react-redux";
import { updateFormState } from "../../../store/actions/form-action";
import { deletePost } from "../../../store/actions/post-actions";


const Post = ({ post:{image, title, tags, message, createdAt, creator, likeCount, _id} }) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={classes.card}>
       <CardMedia
          component="img"
          title={title}
          image={image}
          alt="post image"
          //className={classes.media}
        /> 
        <div className={classes.overlay}>
          <Typography variant="h6">{creator}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: "white" }} size="small" onClick={() => dispatch(updateFormState("postId",_id))}>
            <MoreHorizIcon fontSIze="default" />
          </Button>
        </div>
      <div className={classes.details}>
      <Typography variant="body2" color="textSecondary">{tags.map((tag)=>`#${tag}`)}</Typography>
      </div>
      <CardContent>
      <Typography className={classes.title} variant="h5" gutterBottom>{message}</Typography>
      </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button aria-label="like" size="small" color="primary" >
            <ThumbUpAltIcon fontSize="small"/> Like {likeCount}
          </Button>
          <Button aria-label="delete" size="small" color="primary" onClick={()=>dispatch(deletePost(_id))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
