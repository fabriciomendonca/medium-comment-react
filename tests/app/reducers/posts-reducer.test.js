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
  });

  it('it should handle SAVE_HIGHLIGHT', () => {
    const highlight = {
      _id: '2123312',
      text: 'hi',
      startOffset: 0,
      endOffset: 1
    };
    
    const post = {
      _id: '123456',
      title: 'Post title',
      text: 'Post text',
      highlights: []
    };

    const action = {
      type: actionTypes.SAVE_HIGHLIGHT,
      payload: {
        highlight: highlight,
      }
    };

    expect(postsReducer({selected: post}, action)).toEqual({
      selected: {
        ...post,
        highlights: [highlight]
      }
    });
  });

  it('it should handle UPDATE_HIGHLIGHT', () => {
    const highlight = {
      _id: '2123312',
      text: 'hi',
      startOffset: 0,
      endOffset: 1,
      commentText: 'new text'
    };
    
    const post = {
      _id: '123456',
      title: 'Post title',
      text: 'Post text',
      highlights: [],
    };

    const comment = {
      text: 'new text'
    };

    const action = {
      type: actionTypes.UPDATE_HIGHLIGHT,
      payload: {
        highlight,
        comment
      }
    };

    expect(postsReducer({selected: post}, action)).toEqual({
      selected: {
        ...post,
        highlights: [highlight]
      }
    });
  });
});