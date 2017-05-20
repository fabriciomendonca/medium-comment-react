import axios from 'axios';

import {
  FETCH_POSTS,
  FETCH_POST,
  SAVE_HIGHLIGHT,
  UPDATE_HIGHLIGHT
} from './types';

const API_URL = 'http://localhost:3050';//'https://boiling-mountain-65072.herokuapp.com';
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

export const saveHighlight = (post, highlight) => {
  return async (dispatch) => {
    const hl = await axios.post(`${API_URL}/posts/${post._id}/highlights`, highlight);
    
    dispatch({
      type: SAVE_HIGHLIGHT,
      payload: hl.data
    });
  };
};

export const updateHighlight = (post, highlight) => {
  return async (dispatch) => {
    const hl = await axios.patch(`${API_URL}/posts/${post._id}/highlights`, highlight);

    dispatch({
      type: UPDATE_HIGHLIGHT,
      payload: hl.data
    });
  };
};