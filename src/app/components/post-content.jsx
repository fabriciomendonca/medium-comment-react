import React from 'react';

import PostText from './post-text';
import Highlight from './highlight';
import CommentBox from '../containers/comment-box';
import ActionsMenu from './actions-menu';

export default class PostContent extends React.Component {
  constructor (props) {
    super(props);

    

    this.state = {
      actionsStyle: {
        opacity: 0
      }
    };
  }

  componentDidMount () {
    // handle click outiside the content and close actions menu and comment box
    window.addEventListener('click', (e) => {
      if (e.target.className === 'app') {
        this.hideActionsMenu();
      }
    });

    this.initialPost = {
      ...this.props.post
    };
    
    this.renderSavedHighlights();
  }

  renderSavedHighlights () {    
    const {
      highlights
    } = this.props.post;

    highlights.sort((a, b) => {
      return a.startOffset >= b.startOffset
    });

    const elm = document.querySelector("#contentText");

    highlights.forEach(item => {
      let range = document.createRange();

      let startNode,
          startOffset = item.startOffset,
          endNode,
          endOffset,
          total = item.endOffset - item.startOffset;
      
      const traverseNodes = (node, offset) => {
        if (node.nodeType === 3) {
          const start = startOffset - node.length;
          const sub = total - node.length;

          // Found the start node
          if (start < 0 && !startNode) {
            startNode = node;
            //startOffset = item.startOffset;//node.length - (Math.abs(start));
            total -= Math.abs(start);

            if (total < 0) {
              endNode = node;
              endOffset = node.length - Math.abs(total);
              throw {};
            }
          } else if (startNode) {

            if (sub > 0) {
              total -= node.length;
            } else if (total >= 0) {
              endOffset = total;
              endNode = node;
              total = -1;
              throw {};
            }
          } else {
            startOffset -= node.length;
          }
        } else {
          for(let i = 0 ; i < node.childNodes.length ; i++) {
            traverseNodes(node.childNodes[i]);
          }
        }    
      }

      try{
        traverseNodes(elm);
      } catch(e) {

      }

      range.setStart(startNode, startOffset);
      if (endNode)
        range.setEnd(endNode, endOffset);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      this.renderHighlight(range, item);
    });
  }

  renderHighlight(range, highlight) {
    const markup = document.createElement('span');
    markup.className = 'post-highlight';
    markup.addEventListener('click', (e) => this.renderCommentBox(highlight));
    
    if (! range) return;
    const selected = range.cloneContents();
    
    markup.appendChild(selected);
    
    range.deleteContents();
    range.insertNode(markup);
  }

  saveHighlight (highlight) {
    if (highlight._id) {
      this.props.updateHighlight(highlight);
    } else {
      this.props.saveHighlight(highlight);
    }

    this.hideCommentBox();
  }

  renderActionsMenu (bounding, range, highlight) {
    const posX = bounding.left + (bounding.right - bounding.left) / 2;
    const posY = bounding.top;
    const style = {
      position: 'absolute',
      left: `${posX}px`,
      top: `${posY}px`,
      opacity: 1
    };

    this.setState({
      ...this.state,
      actionsStyle: style,
      highlight,
      range,
    });
  }

  renderCommentBox (highlight) {
    this.props.openCommentBox(highlight);
  }

  onClickComment (e) {
    const { range } = this.state;

    this.renderHighlight(range, this.state.highlight);
    this.renderCommentBox(this.state.highlight);

    this.hideActionsMenu(false);
  }

  hideActionsMenu (hideCommentBox = true) {
    const style = {
      opacity: 0,
      display: 'none'
    };
    
    this.setState({
      ...this.state,
      actionsStyle: style,
    });

    if (hideCommentBox) {
      this.props.closeCommentBox();
    }
  }

  hideCommentBox () {
    const style = {
      opacity: 0
    };

    this.setState({
      ...this.state,
      commentBoxStyle: style
    });
  }

  onMouseUp(e) {
    const selection = window.getSelection();
    const str = selection.toString();

    if (!selection.anchorNode || ! str.length) {
      this.hideActionsMenu();
      return;
    };

    const range = selection.getRangeAt(0);
    
    // skip when selection is changing paragraph
    if (range.commonAncestorContainer.className === 'content-text' || 
        range.startContainer.className === 'post-highlight' || 
        range.endContainer.className === 'post-highight'
    ) {
      this.hideActionsMenu();
      return ;
    }

    let p = e.currentTarget;
    
    const cloned = range.cloneRange();
    cloned.selectNodeContents(p);
    
    cloned.setEnd(range.endContainer, range.endOffset);
    const endOffset = cloned.toString().length;
    cloned.setEnd(range.startContainer, range.startOffset);
    const startOffset = cloned.toString().length;

    const highlight = {
      text: range.toString().trim(),
      commentText: '',
      startOffset,
      endOffset
    };
    
    const bounding = range.getBoundingClientRect();
    this.renderActionsMenu(bounding, range, highlight);
  }

  render () {
    return (
      <div className="post-content">
        <PostText post={this.props.post} ref="content" renderSavedHighlights={() => this.renderSavedHighlights()} onMouseUp={(e) => this.onMouseUp(e)} />
        <CommentBox />
        <ActionsMenu style={this.state.actionsStyle} onClickComment={(e) => this.onClickComment(e)} />
      </div>
    );
  } 
}