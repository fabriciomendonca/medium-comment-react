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
        list: action.payload
      };
    case FETCH_POST: 
      return {
        selected: action.payload
      }
    case SAVE_HIGHLIGHT:
      const list = [
        ...state.selected.highlights,
        action.payload
      ];

      return {
        selected: {
          ...state.selected,
          highlights: list
        },
      };
    case UPDATE_HIGHLIGHT:
      const highlights = state.selected.highlights.filter(item => {
        return item._id !== action.payload._id;
      });
      return {
        selected: {
          ...state.selected,
          highlights: [
            ...highlights,
            action.payload
          ]
        },
      };
  }

  return state;
};