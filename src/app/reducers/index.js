import { combineReducers } from 'redux';

import postsReducer from './posts-reducer';
import highlightsReducer from './highlights-reducer';

export default combineReducers({
  posts: postsReducer,
  highlight: highlightsReducer
});