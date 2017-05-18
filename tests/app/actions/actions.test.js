import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

import {
  FETCH_POSTS,
  FETCH_POST
} from '../../../src/app/actions/types';
import {
  fetchPosts,
  fetchPost
} from '../../../src/app/actions/actions';

describe('Test action creators', () => {
  afterEach(() => {
    
  });

  it('should return a list of posts (fetchPosts)', async () => {
    const post = {
      _id: '123456',
      title: 'Test post',
      text: 'Text of the test post'
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
      text: 'This is a new post'
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
});
