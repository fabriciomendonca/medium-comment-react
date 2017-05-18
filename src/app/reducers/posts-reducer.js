import {
  FETCH_POSTS,
  FETCH_POST
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS: 
      return { 
        ...state,
        list: action.payload
      };
    case FETCH_POST: 
      return {
        ...state,
        selected: action.payload
      }
  }

  return state;
}