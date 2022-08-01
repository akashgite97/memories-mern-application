import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useStyles from './styles';
import { getPostById, getPostBySearch } from '../../../redux/slices/postSlice';
import CommentSection from '../../CommentSection.js';

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostById(id)); }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: 'none', tags: post?.data?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress />
      </Paper>
    );
  }

  const recommendedPosts = posts?.data?.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.data.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.data.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.data.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.data.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.data.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.data.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post.data} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.data.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
       {!!recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(({ title, name, message, likes, image, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={image} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )} 
    </Paper>
  );
};

export default Post;