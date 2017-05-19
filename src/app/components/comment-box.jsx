import React from 'react';
import image from '../../../assets/img/avatar-placeholder.png';

class CommentBox extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: ''
    }
  }

  onMouseOut (e) {
    const mouseX = e.clientX,
          mouseY = e.clientY,
          bounding = e.target.getBoundingClientRect();


    if (e.target !== e.currentTarget) return;
    
    if (mouseX < bounding.left || 
        mouseX > bounding.right ||
        mouseY < bounding.top ||
        mouseY > bounding.top + bounding.height
    ) {
      this.props.onMouseOut()
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
        <div className="user-info">
          <div className="avatar">
            <img src="../../../assets/img/avatar-placeholder.png" alt=""/>
          </div>
        </div>
        <textarea defaultValue={this.state.comment} onChange={(e) => this.onChange(e)} placeholder="Insert your comment">
        </textarea>
      </div>
    )
  }
}

export default CommentBox;