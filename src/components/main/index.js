import React, { Component } from 'react';

import CSVClient from '../../client/csv.client';

import TableComponent from '../table';

class MainComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cols: [],
      rows: [],
      request: CSVClient.getCSV()
    };
  }

  getCSVPage() {
    if (this.state.request.running) {
      this.state.request.cancel();
    }
    this.state.request.exec()
      .then((res) => {
        let data = res.data || {};
        this.setState({
          loading: false,
          cols: data.columns || [],
          rows: data.rows || []
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
        })
      });
  }

  componentWillMount() {
    this.getCSVPage();
  }

  render() {
    const { loading, cols, rows } = this.state;

    const uploadLink = (<a hred="/import">importar datos</a>);

    const tableResult = (<TableComponent cols={ cols } rows={ rows } />);

    return (<div className="container">

      { loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>) : (cols.length ? tableResult : uploadLink)
      }

    </div>)
  }

}

export default MainComponent;
