import axios from 'axios';

import {
  FETCH_POSTS,
  FETCH_POST,
  OPEN_COMMENT_BOX,
  CLOSE_COMMENT_BOX,
  SAVE_HIGHLIGHT,
  UPDATE_HIGHLIGHT
} from './types';


export const API_URL = process.env.API_URL || 'https://boiling-mountain-65072.herokuapp.com';

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

export const openCommentBox = (highlight) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_COMMENT_BOX,
      payload: highlight
    });
  };
};

export const closeCommentBox = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_COMMENT_BOX,
      payload: {}
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