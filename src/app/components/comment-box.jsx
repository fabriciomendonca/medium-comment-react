import React from 'react';
import image from '../../../assets/img/avatar-placeholder.png';

class CommentBox extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: this.props.highlight.commentText || '',
      disableSave: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.highlight) {
      this.setState({
          comment: nextProps.highlight.commentText || '' ,
          disableSave: false
      });
    }
  }

  saveHighlight () {
    this.props.highlight.commentText = this.state.comment;
    this.props.saveHighlight(this.props.highlight);

    this.setState({
      ...this.state,
      disableSave: true
    })
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

  renderSave() {
    if (this.props.showSave) {
      return (
        <button className="btn btn-raised btn-success" disabled={this.state.disableSave} type="button" onClick={() => this.saveHighlight()}>Save highlight</button>
      );
    }

    return null;
  }

  render () {
    let show = (
      <textarea value={this.state.comment} onChange={(e) => this.onChange(e)} placeholder="Insert a comment (optional)">
      </textarea>
    );

    if (this.props.disableSave) {
      show = (
        <div>Saving highlight...</div>
      );
    }

    return (
      <div className="comment-box" style={this.props.style} onMouseOut={(e) => this.onMouseOut(e)}>
        <div className="box-content">
          <div className="user-info">
            <div className="avatar">
              <img src="../../../assets/img/avatar-placeholder.png" alt=""/>
            </div>
          </div>
          {show}
          <div className="btns">
            {this.renderSave()}
            <button className="btn btn-raised btn-danger" type="button" onClick={() => this.cancelHighlight()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentBox;