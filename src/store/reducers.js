import { combineReducers } from 'redux';
import { postReducer } from './reducers/post-reducer';

export default combineReducers({
  posts: postReducer,
});
