import React from 'react';

class PostText extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.post.highlights.length !== this.props.post.highlights.length;
  }

  componentDidUpdate () {
    this.props.renderSavedHighlights();
  }

  render () {
    return (
      <div id="contentText" key={new Date().getTime()} className="content-text" onMouseUp={(e) => this.props.onMouseUp(e)} dangerouslySetInnerHTML={{__html: this.props.post.text || ''}}>
      </div>
    );
  }
}

export default PostText;
