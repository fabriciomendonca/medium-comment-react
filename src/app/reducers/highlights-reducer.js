import * as types from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case types.OPEN_COMMENT_BOX:
    case types.CLOSE_COMMENT_BOX:
    case types.SAVE_HIGHLIGHT:
    case types.UPDATE_HIGHLIGHT:
      return {
        action: action.type,
        highlight: action.payload
      };
  }

  return state;
}