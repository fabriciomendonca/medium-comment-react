import {
  FETCH_POSTS,
  FETCH_POST,
  SAVE_HIGHLIGHT,
  UPDATE_HIGHLIGHT
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
    case SAVE_HIGHLIGHT:
      return {
        ...state,
        selected: {
          ...state.selected,
          highlights: [
            ...state.selected.highlights,
            action.payload
          ]
        }
      };
    case UPDATE_HIGHLIGHT:
      const highlights = state.selected.highlights.filter(item => {
        return item._id !== action.payload._id;
      });
      return {
        ...state,
        selected: {
          ...state.selected,
          highlights: [
            ...highlights,
            action.payload
          ]
        }
      };
  }

  return state;
};