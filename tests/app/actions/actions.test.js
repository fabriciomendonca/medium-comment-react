import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

import {
  FETCH_POSTS,
  FETCH_POST,
  SAVE_HIGHLIGHT,
  UPDATE_HIGHLIGHT
} from '../../../src/app/actions/types';
import {
  fetchPosts,
  fetchPost,
  saveHighlight,
  updateHighlight,
  API_URL
} from '../../../src/app/actions/actions';

describe('Test action creators', () => {

  it('should return a list of posts (fetchPosts)', async () => {
    const post = {
      _id: '123456',
      title: 'Test post',
      text: 'Text of the test post',
      comments: [
        {
          text: 'This is a test comment'
        }
      ]
    };

    axios.get = jest.fn((url) => {
      return Promise.resolve({
        data: [post]
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_POSTS,
        payload: [post]
      }
    ];

    const store = mockStore({ posts: [] });
    await fetchPosts()(store.dispatch);
    
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return an specific post', async () => {
    const post = {
      _id: '123456',
      title: 'New post',
      text: 'This is a new post',
      highlights: [{
        text: 'is a new',
        startIndex: 6,
        endIndex: 13
      }]
    };

    axios.get = jest.fn((url) => {
      return Promise.resolve({ 
        data: post 
      });
    });

    const store = mockStore({ post: {} });

    await fetchPost('123456')(store.dispatch);

    expect(store.getActions()).toEqual([{
      type: FETCH_POST,
      payload: post
    }]);
  });

  axios.defaults.adapter = httpAdapter;

  it('should save a highlight', async () => {
    const post = {
      _id: '123456',
      highlights: [{
        text: 'is a new',
        startOffset: 6,
        endOffset: 13
      }]
    };
    const highlight = {
      text: 'high',
      startOffset: 0,
      endOffset: 4
    };

    nock(API_URL)
      .post(`/posts/${post._id}/highlights`, highlight)
      .reply(200, highlight);
    
    const store = mockStore({ highlight: {} });
    await saveHighlight(post, highlight)(store.dispatch);

    expect(store.getActions()).toEqual([{
      type: SAVE_HIGHLIGHT,
      payload: highlight
    }]);
  });

  it('should update a highlight commentText', async () => {
    const post = {
      _id: '123456',
      highlights: [{
        text: 'is a new',
        startIndex: 6,
        endIndex: 13
      }]
    };
    const highlight = {
      text: 'high',
      startIndex: 0,
      endIndex: 4
    };
    
    nock(API_URL)
      .patch(`/posts/${post._id}/highlights`, highlight)
      .reply(200, highlight);
    
    const store = mockStore({ highlight: {} });
    await updateHighlight(post, highlight)(store.dispatch);

    expect(store.getActions()).toEqual([{
      type: UPDATE_HIGHLIGHT,
      payload: highlight
    }]);
  });
});
