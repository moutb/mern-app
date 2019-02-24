import React, { Component } from 'react';
import classNames from 'classnames';

export default class Icon extends Component {

  render() {
    const { name, before } = this.props;
    return (<i className={classNames('fa', `fa-${name}`, {
      'fa-before': before || false
    })}></i>);
  }

}
