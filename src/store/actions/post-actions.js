import { makeAPIRequest } from '../../constant/api';
import { API_URL, HTTP_METHOD } from '../../constant/constant';
import { GET_ALL_POSTS, CREATE_POST, UPDATE_POST, GET_POST_BY_ID, DELETE_POST, LIKE_POST } from '../action-type-constant';

//GET: All Posts
export const getPosts = () => (dispatch) => {
  return makeAPIRequest(API_URL.POSTS, HTTP_METHOD.GET)(dispatch, GET_ALL_POSTS)
};

//GET/:id: Single Post
export const getPostById = (id) => (dispatch) => {
  const url= `http://localhost:5000/posts/${id}`
  return makeAPIRequest(url, HTTP_METHOD.GET)(dispatch, GET_POST_BY_ID)
};

//POST: Create Post
export const createPost=(postData)=>(dispatch) => {
  const reqBody={
    creator:postData.Creator,
    title:postData.Title,
    message:postData.Message,
    tags:postData.Tags,
    image:postData.Image
  }
  return makeAPIRequest(API_URL.CREATE_POST, HTTP_METHOD.POST,reqBody)(dispatch, CREATE_POST)
}

//PUT: Update Post
export const updatePost=(id,postData)=>(dispatch) => {
  const URL = `http://localhost:5000/posts/update/${id}`
  const reqBody={
    creator:postData.Creator,
    title:postData.Title,
    message:postData.Message,
    tags:postData.Tags,
  }
  return makeAPIRequest(URL, HTTP_METHOD.PUT,reqBody)(dispatch, UPDATE_POST)
}

//DELETE: Delete Post
export const deletePost=(id)=>(dispatch) => {
  const url = `http://localhost:5000/posts/delete/${id}`
  return makeAPIRequest(url, HTTP_METHOD.DELETE)(dispatch, DELETE_POST)
}

//PATCH: like Post
export const likePost=(id)=>(dispatch) => {
  const url = `http://localhost:5000/posts/${id}/likes`
  return makeAPIRequest(url, HTTP_METHOD.PATCH)(dispatch, LIKE_POST)
}