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

  async updateHighlight(highlight) {
    await this.props.updateHighlight(this.props.post, highlight);

    // Force reload to mount the text ranges
    // should be factored
    document.location.reload();
  }

  saveHighlight (highlight) {
    this.props.saveHighlight(this.props.post, highlight);

    // Force reload to mount the text ranges
    // should be refactored
    document.location.reload();
  }

  render () {
    const { post, highlightSaved, highlightUpdated } = this.props;
    if (!post) return (
      <div>Loading post...</div>
    );

    return (
      <div className="post">
        <h2>{post.title}</h2>
        <div>
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
    post: state.posts.selected,
  };
};

export default withRouter(connect(mapStateToProps, actions)(Post));
