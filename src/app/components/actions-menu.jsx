import React from 'react';

export default class ActionsMent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <div className="actions-menu" style={this.props.style}>
        <div className="menu-content">
          <div className="menu-item" onClick={this.props.onClickComment}>
            <i className="fa fa-comment"></i>
          </div>
          <i className="caret fa fa-caret-down"></i>
        </div>
      </div>
    );
  }
};