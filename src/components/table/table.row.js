import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from '../icon';

export default class TableRow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editionEnabled: false,
      id: this.props.id,
      cols: this.props.cols || [],
      lastEvtclicked: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('props', props, 'state', state);
    if (props.id !== state.id) {
      state.cols = props.cols;
      state.id = props.id;
      state.lastEvtclicked = null;
    }
    return state;
  }

  onDeleteClick = () => {
    if (this.props.disableEvents) {
      return false;
    }

    this.setState({ lastEvtclicked: 'delete' })

    if (typeof this.props.onDelete === 'function') {
      this.props.onDelete(this.props.id);
    }
  }

  onSaveClick = () => {
    if (this.props.disableEvents) {
      return false;
    }

    this.setState({ lastEvtclicked: 'save' })

    if (typeof this.props.onSave === 'function') {
      this.props.onSave(this.props.id, this.state.cols);
    }
  }

  onChange = (i, evt) => {
    let cols = this.state.cols;
    cols[i] = evt.target.value;

    this.setState({
      cols: cols
    });
  }

  render() {
    const { index, disableEvents } = this.props;
    const { cols, editionEnabled, lastEvtclicked } = this.state;

    return cols.length && (
      <tr>
        <th scope="row">{ index }</th>
        <th scope="row">
          <ul className="actions-list">
            { !editionEnabled && (<li onClick={() => !disableEvents && this.setState({ editionEnabled: true }) } className="text-muted"><Icon name="pencil" /></li>) }
            <li onClick={ this.onDeleteClick } className={classNames({
              "text-muted": !disableEvents || lastEvtclicked !== 'delete',
              "text-primary": disableEvents && lastEvtclicked === 'delete' })} >
              <Icon name="trash" />
            </li>
            { editionEnabled && (
              <li onClick={ this.onSaveClick } className={ classNames({
                "text-muted": !disableEvents || lastEvtclicked !== 'save',
                "text-primary": disableEvents && lastEvtclicked === 'save' })}>
                <Icon name="save" />
              </li>) }
            { editionEnabled && (<li onClick={ () => !disableEvents && this.setState({ editionEnabled: false }) } className="text-muted"><Icon name="times" /></li>) }
          </ul>
        </th>
        { cols.map((row, i) => (
            <td key={ i }>
              { !editionEnabled ? row : (<input type="text" value={ row } onChange={ this.onChange.bind(this, i) } />)}
            </td>
          )) }
      </tr>
    );

  }

}
