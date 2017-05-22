import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import *  as actions from '../actions/actions';

class CommentsList extends React.Component {
  constructor (props) {
    super(props);
  }

  renderComment (comment) {
    const day = moment(comment.createdAt);
    return (
      <div key={comment._id} id={comment._id} className="comment">
        <div className="avatar">
          <div className="image">
            <img src="/public/img/avatar-placeholder.png" alt=""/>
          </div>
          <div className="user-data">
            <h4>Fabricio Mendonca</h4>
            <small>{day.fromNow()}</small>
          </div>
        </div>
        <p>{comment.text}</p>
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
    comments: state.comments.list,
  };
};

export default withRouter(connect(mapStateToProps, actions)(CommentsList));
