import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import image from '../../../assets/img/avatar-placeholder.png';
import * as actionTyes from '../actions/types';
import * as actions from '../actions/actions';

class CommentBox extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: this.props.highlight ? this.props.highlight.commentText : '',
      disableSave: false
    }

    this.refreshScreen = this.refreshScreen.bind(this);
  }

  componentDidMount () {
    window.removeEventListener('scroll', this.refreshScreen);
    window.addEventListener('scroll', this.refreshScreen);
  }

  refreshScreen () {
    if (this.refs.commentBox.style.opacity === '1') {
      const { top } = this.refs.commentBox.style;
      const { scrollY } = window;

      if (Math.abs(parseInt(top) - scrollY) > 50) {
        this.setState({
          ...this.state
        });
      }
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.refreshScreen);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.highlight) {
      this.setState({
          comment: nextProps.highlight.commentText || '' ,
          disableSave: false
      });
    }
  }

  saveHighlight () {
    this.props.highlight.commentText = this.state.comment;
    if (this.props.highlight._id) {
      this.props.updateHighlight(this.props.post, this.props.highlight);
    } else {
      this.props.saveHighlight(this.props.post, this.props.highlight);
    }

    this.setState({
      ...this.state,
      disableSave: true
    })
  }

  cancelHighlight () {
    this.props.closeCommentBox();
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
    const {
      action,
      highlight
    } = this.props;

    const style = {
      opacity: !action || action === actionTyes.CLOSE_COMMENT_BOX ? 0 : 1,
      top: `${50 + window.scrollY}px`,
    };

    let linkComment = '';
    if (highlight && highlight._comment){
      linkComment = (
        <small><a href={`#${highlight? highlight._comment : ''}`}>view at comments list</a></small>
      );
    }
    const disabled = this.state.disableSave || (highlight && highlight._comment && this.state.comment.trim().length === 0)
    return (
      <div className="comment-box" ref="commentBox" style={style} onMouseOut={(e) => this.onMouseOut(e)}>
        <div className="box-content">
          <div className="user-info">
            <div className="avatar">
              <img src="/public/img/avatar-placeholder.png" alt=""/>
            </div>
          </div>
          {linkComment}
          <textarea disabled={this.state.disableSave} value={this.state.comment} onChange={(e) => this.onChange(e)} placeholder="Insert a comment (optional)">
          </textarea>
          <div className="btns">
            <button className="btn btn-raised btn-success" ref="saveButton" type="button" disabled={disabled} onClick={() => this.saveHighlight()}>Save highlight</button>
            <button className="btn btn-raised btn-danger" type="button" onClick={() => this.cancelHighlight()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    highlight: state.highlight.highlight,
    action: state.highlight.action,
    post: state.posts.selected
  };
};

export default withRouter(connect(mapStateToProps, actions)(CommentBox));