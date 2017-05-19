import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import * as actions from '../actions/actions';

import PostoContent from '../components/post-content';

class Post extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchPost(this.props.match.params.id);
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
          <PostoContent post={post} />
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
