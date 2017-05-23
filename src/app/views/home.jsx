import React from 'react';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as actions from '../actions/actions';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchPosts();
  }

  render () {
    return(
      <div className="home">
        <h1>Medium comment</h1>
        <p>This app implements a simple version of the Medium's text highlight and comment feature.</p>
        <p>Select a post and start the demo.</p>
        <p>Front end source code: <a href="https://github.com/fabriciomendonca/medium-comment-react" target="_blank">https://github.com/fabriciomendonca/medium-comment-react</a></p>
        <p>Back end source code: <a href="https://github.com/fabriciomendonca/medium-comment-api" target="_blank">https://github.com/fabriciomendonca/medium-comment-api</a></p>
        <div className="posts">
          {this.props.posts ? this.props.posts.map(this.renderPosts) : 'Loading posts...'}
        </div>
      </div>
    );
  }

  renderPosts (post) {
    return (
      <div className="post" key={post._id}>
        <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.list
  };
};

export default withRouter(connect(mapStateToProps, actions)(Home));