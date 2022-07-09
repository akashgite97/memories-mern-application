import { combineReducers } from 'redux';
import { errorMessageReducer } from './reducers/error-message-reducer';
import { formReducer } from './reducers/form-reducer';
import { changeLanguageReducer } from './reducers/locale-reducer';
import { getAllPostReducer, getPostByIdReducer, updatePostReducer } from './reducers/post-reducer';

export default combineReducers({
  posts: getAllPostReducer,
  form: formReducer,
  language:changeLanguageReducer,
  globalError:errorMessageReducer,
  updatedPost:updatePostReducer,
  getIndividualPost:getPostByIdReducer,
});
