import React from 'react';

import Highlight from './highlight';
import CommentBox from './comment-box';

export default class PostContent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      post: this.props.post
    };

    this.renderCommentBox = this.renderCommentBox.bind(this);
    this.removeCommentBox = this.removeCommentBox.bind(this);
  }

  renderCommentBox (e) {
    const bounding = e.target.getBoundingClientRect();
    const posX = (bounding.left + (bounding.width / 2));
    const posY = bounding.bottom;
    const style = {
      position: 'absolute',
      opacity: '1',
      top: posY + 'px',
      left: posX + 'px'
    };

    this.setState({
      ...this.state,
      commentBox: <CommentBox style={style} onMouseOut={this.removeCommentBox} />
    });
  }

  removeCommentBox () {
    this.setState({
      ...this.state,
      commentBox: null
    });
  }

  renderPostText () {
    let {text} = this.state.post;
    
    if (text.length === 0) return '';

    let arrHighlights = [];
    let offset = 0, left, center, right;

    // Grab the highlights array than order it
    let {highlights} = this.state.post;
    highlights = highlights.sort((a, b) => {
      return a.startIndex >= b.startIndex;
    });

    // Loop the highlights array and create the <Highlight /> Component
    // Push the elements in a array in order to return it for the render method
    this.state.post.highlights.forEach((highlight, index) => {
      if (highlight.startIndex === highlight.endIndex) return;
      
      left = text.slice(offset, highlight.startIndex),
      center = text.slice(highlight.startIndex, highlight.endIndex),
      right = text.slice(highlight.endIndex);
      
      offset += left.length + center.length;
      arrHighlights.push(left);
      arrHighlights.push(<Highlight text={center} key={index} renderCommentBox={this.renderCommentBox} removeCommentBox={this.removeCommentBox} />);
    });

    // Push the remaining text
    arrHighlights.push(right);

    return arrHighlights;
  }

  onMouseUp(e) {
    const selection = window.getSelection();
    
    if (!selection.anchorNode) return;

    const range = selection.getRangeAt(0).cloneRange();
    const str = selection.toString();
    
    // Get all the previous text to set the startIndex absolute
    let prev = selection.anchorNode;
    let prevText = prev.textContent.slice(0, selection.focusOffset);
    prev = prev.previousSibling;
    do {
      // Ignore comment nodes
      if (prev.nodeType !== 8 ) {
        prevText = prev.textContent + prevText;
      }
      
      prev = prev.previousSibling;
    } while(prev);

    // Clean the selection on previous text
    prevText = prevText.replace(str, '');

    const highlight = {
      text: str,
      startIndex: prevText.length,
      endIndex: prevText.length + str.length
    };

    // Update the state
    this.setState({
      post: {
        ...this.state.post,
        highlights: [
          ...this.state.post.highlights,
          highlight
        ]
      }
    });
  }

  render () {
    return (
      <div className="post-content" onMouseUp={(e) => this.onMouseUp(e)}>
        <div>
          {this.renderPostText()}
          {this.state.commentBox || ''}
        </div>
      </div>
    );
  } 
}