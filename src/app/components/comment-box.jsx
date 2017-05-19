import React from 'react';
import image from '../../../assets/img/avatar-placeholder.png';

class CommentBox extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: this.props.highlight.commentText || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.highlight) {
      this.setState({
          comment: nextProps.highlight.commentText || ''
      });
    }
  }

  saveHighlight () {
    this.props.highlight.commentText = this.state.comment;
    this.props.saveHighlight(this.props.highlight);
  }

  cancelHighlight () {
    this.props.cancelHighlight(this.props.highlight);
  }

  onMouseOut (e) {
    const mouseX = e.clientX,
          mouseY = e.clientY,
          bounding = e.target.getBoundingClientRect();
    
    if (mouseX < bounding.left || 
        mouseX > bounding.right ||
        mouseY < bounding.top ||
        mouseY > bounding.top + bounding.height
    ) {
      if (e.target.className === 'box-content' && this.props.onMouseOut) {
        this.props.onMouseOut(e);
      }
    }
  }

  onChange (e) {
    this.setState({
      comment: e.target.value
    });
  }

  render () {
    return (
      <div className="comment-box" style={this.props.style} onMouseOut={(e) => this.onMouseOut(e)}>
        <div className="box-content">
          <div className="user-info">
            <div className="avatar">
              <img src="../../../assets/img/avatar-placeholder.png" alt=""/>
            </div>
          </div>
          <textarea value={this.state.comment} onChange={(e) => this.onChange(e)} placeholder="Insert a comment (optional)">
          </textarea>
          <div className="btns">
            <button className="btn btn-raised btn-success" type="button" onClick={() => this.saveHighlight()}>Save highlight</button>
            <button className="btn btn-raised btn-danger" type="button" onClick={() => this.cancelHighlight()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentBox;