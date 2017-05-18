import { combineReducers } from 'redux';

import postsReducer from './posts-reducer';

export default combineReducers({
  posts: postsReducer
});