import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import *  as actions from '../actions/actions';

class CommentsList extends React.Component {
  constructor (props) {
    super(props);
  }

  renderComment (comment) {
    return (
      <div key={comment._id} id={comment._id} className="comment">
        <p>{comment.text}</p>
        <small>{comment.createdAt}</small>
      </div>
    )
  }

  render () {
    return (
      <div className="comments-list">
        {this.props.comments.map(this.renderComment)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.posts.selected.comments //state.comments.comments
  };
};

export default withRouter(connect(mapStateToProps, actions)(CommentsList));
