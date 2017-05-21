import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import * as actions from '../actions/actions';

import PostContent from '../components/post-content';
import CommentsList from '../containers/comments-list';

class Post extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchPost(this.props.match.params.id);
  }

  render () {
    const { post, highlightSaved, highlightUpdated } = this.props;
    if (!post) return (
      <div>Loading post...</div>
    );

    return (
      <div className="post">
        <h2>{post.title}</h2>
        <PostContent 
          post={post}
          openCommentBox={(highlight) => this.props.openCommentBox(highlight)}
          closeCommentBox={() => this.props.closeCommentBox()}
          saveHighlight={(highlight) => this.saveHighlight(highlight)}
          updateHighlight={(highlight) => this.updateHighlight(highlight)} />
        <h3>Comments</h3>
        <CommentsList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.selected,
  };
};

export default withRouter(connect(mapStateToProps, actions)(Post));
