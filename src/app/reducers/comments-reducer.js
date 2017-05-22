import * as actionTypes from '../actions/types';
import * as actions from '../actions/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST:
      return {
        list: action.payload.comments
      }
    case actionTypes.SAVE_HIGHLIGHT:
    case actionTypes.UPDATE_HIGHLIGHT:
      const comment = action.payload.comment;
      
      if (comment) {
        let comments = state.list.filter(item => item._id !== comment._id);
        return {
          list: [
            ...comments,
            comment
          ]
        };
      }
      break;
  }

  return state;
}
