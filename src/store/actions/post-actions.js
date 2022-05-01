import * as api from '../../constant/api';
import { GET_ALL_POSTS } from '../action-type-constant';

//Action Creates
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = api.fetchPosts();
    dispatch({ type: GET_ALL_POSTS, payload: data });
  } catch (error) {
    console.log('error');
  }
};
