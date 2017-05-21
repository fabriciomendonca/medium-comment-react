import * as actionTypes from '../actions/types';
import * as actions from '../actions/actions';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_COMMENTS:
      return {
        list: action.payload
      }
  }

  return state;
}
