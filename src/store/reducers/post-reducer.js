import { CREATE_POST, GET_ALL_POSTS } from '../action-type-constant';

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    case CREATE_POST:
      return state;
    default:
      return state;
  }
};
