import React from 'react';

class PostText extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text;
  }

  render () {
    return (
      <div className="content-text" ref="contentText" onMouseUp={(e) => this.props.onMouseUp(e)} dangerouslySetInnerHTML={{__html: this.props.text}}>
      </div>
    );
  }
}

export default PostText;
