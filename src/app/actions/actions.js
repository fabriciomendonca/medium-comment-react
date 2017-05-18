import axios from 'axios';

import {
  FETCH_POSTS,
  FETCH_POST
} from './types';

const API_URL = 'http://localhost:3050'
export const fetchPosts = () => {
  return async (dispatch) => {
    const posts = await axios.get(`${API_URL}/posts`);

    dispatch({
      type: FETCH_POSTS,
      payload: posts.data
    });
  };
};

export const fetchPost = (id) => {
  return async (dispatch) => {
    const post = await axios.get(`${API_URL}/posts/${id}`);
  
    dispatch({
      type: FETCH_POST,
      payload: post.data
    });
  };
};