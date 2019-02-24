import React, { Component } from 'react';
import classNames from 'classnames';

import CSVClient from '../../client/csv.client';

import TableHead from './table.head';
import TableRow from './table.row';

import './index.scss';

class TableComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      working: false,
      rows: this.props.rows
    }
  }

  onRowDelete = (id) => {
    this.setState({ working: true });
    console.log(this.state.rows, id);
    CSVClient.deleteRow(id).exec()
      .then(() => this.setState({
        working: false,
        rows: this.state.rows.filter(row => row._id !== id)
      }))
      .catch(err => {
       alert('error deleting row: ' + err.message)
       this.setState({ working: false });
      })
  }

  onRowChange = (id, data) => {
    this.setState({ working: true });

    CSVClient.updateRow(id).exec(data)
      .then(() => this.setState({ working: false }))
      .catch(err => {
       alert('error saving row: ' + err.message)
       this.setState({ working: false });
      })
    console.log('row changed ', id, data);
  }

  render() {
    const { cols } = this.props;
    const { working, rows } = this.state;

    console.log('rows', rows);

    let tableBody = ( <tr>
      <td colspan={cols.length}>No se ha añadido ninguna entrada</td>
    </tr> );

    if (rows.length) {
      tableBody = rows.map((row, i) => (
        <TableRow disableEvents={ working } onSave={ this.onRowChange } onDelete={ this.onRowDelete } key={ i } index={ i + 1 } id={ row._id } cols={ row.data } />
      ));
    }

    return (
      <table className={ classNames("table", "table-striped", "TableCenter") }>
          <TableHead cols={ cols } />
          <tbody>
            { tableBody }
          </tbody>
      </table>
    )

  }

}

export default TableComponent;
