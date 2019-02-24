import React, { Component } from 'react';

export default class TableHead extends Component {

  render() {
    const { cols } = this.props;

    return cols.length && (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Acciones</th>
          { cols.map((row, i) => (
              <th scope="col" key={ i }>{ row }</th>
            )) }
        </tr>
      </thead>
    );

  }

}
