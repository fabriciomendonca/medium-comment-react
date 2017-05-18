import postsReducer from '../../../src/app/reducers/posts-reducer';
import * as actionTypes from '../../../src/app/actions/types';

describe('Test posts reducer', () => {
  it('should handle FETCH_TODOS action', () => {
    const posts = [
      {
        _id: '123456',
        title: 'Post title',
        text: 'Post text'
      }
    ];

    const action = {
      type: actionTypes.FETCH_POSTS,
      payload: posts
    };

    expect(postsReducer([], action)).toEqual({
      list: posts
    });
  });

  it('should handle FETCH_POST', () => {
    const post = {
      _id: '123456',
      title: 'Post title',
      text: 'Post text'
    };

    const action = {
      type: actionTypes.FETCH_POST,
      payload: post
    };

    expect(postsReducer([], action)).toEqual({
      selected: post
    });
  })
});