import React from 'react';

export default (props) => {
  return (
    <span className="post-highlight" onMouseOver={(e) => props.renderCommentBox(e)}>
      {props.text}
    </span>
  )
}