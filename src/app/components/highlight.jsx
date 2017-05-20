import React from 'react';

export default class Highlight extends React.Component {
  render () {
    return (
      <span className="post-highlight" ref="span" onClick={(e) => props.renderCommentBox(e, props.highlight)}>
      </span>
    )
  }
}