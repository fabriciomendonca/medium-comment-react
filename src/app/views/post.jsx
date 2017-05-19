import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import * as actions from '../actions/actions';

import PostContent from '../components/post-content';

class Post extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchPost(this.props.match.params.id);
  }

  updateHighlight(highlight) {
    this.props.updateHighlight(this.props.post, highlight);
  }

  saveHighlight (highlight) {
    this.props.saveHighlight(this.props.post, highlight);
  }

  render () {
    const { post } = this.props;
    if (!post) return (
      <div>Loading post...</div>
    );

    return (
      <div className="post">
        <h2>{post.title}</h2>
        <div className="post-content">
          <PostContent 
            post={post} 
            saveHighlight={(highlight) => this.saveHighlight(highlight)}
            updateHighlight={(highlight) => this.updateHighlight(highlight)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.selected
  };
};

export default withRouter(connect(mapStateToProps, actions)(Post));
