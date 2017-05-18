import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  render () {
    return(
      <div className="home">
        <h1>Medium comment</h1>
        <p>This app implements a simple version of the Medium's text highlight and comment feature.</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

export default withRouter(connect(mapStateToProps)(Home));