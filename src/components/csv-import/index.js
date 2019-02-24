import React, { Component } from 'react';
import CSVClient from '../../client/csv.client';

import Icon from '../icon';

import './index.scss';

export default class CSVImportComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      error: null,
      loading: false,
      success: false,
      selectValue: 'whitespace',
      customDelimiter: '',
      request: CSVClient.createCSV()
    };
  }

  loadContent = () => {
    if (this.state.success) {
      return false;
    }
    this.setState({ loading: true, error: null, success: false });

    const data = new FormData();
    data.append('file', this.state.file, this.state.file.name);

    let delimiter = this.state.selectValue === 'custom' ? this.state.customDelimiter : this.state.selectValue;

    this.state.request.exec(data, { delimiter })
      .then(() => this.setState({
        loading: false,
        success: true
      }))
      .catch(err => this.setState({
        loading: false,
        error: err
      }));

    /*setTimeout(() => this.setState({
      loading: false,
      error: new Error('file data is corrupted')
    }), 2000)*/

  }

  handleselectedFile = (evt) => {
    this.setState({
      file: evt.target.files[0],
      error: null,
      success: false
    });
  }

  onError = (error) => {
    console.log('error importing file', error);
    this.setState({ data: null, error: error });
  }

  render() {
    const { error, loading, success, file, selectValue, customDelimiter } = this.state;

    const ButtonText = () => {
      if (loading) {
        return 'Cargando'
      }
      return success ? 'Contenido cargado' : 'Cargar';
    }

    return (
      <div>
        <div className="alert alert-warning">
          <h4><Icon name="exclamation-triangle" before={ true } /> Aviso</h4>
          El contenido cargado reemplazará toda la información existente en la base de datos
        </div>

        <div className="csv-file">
          <label className="csv-file-label" htmlFor="customFile">Seleccione el fichero CSV a importar</label>
          <input type="file" className="csv-file-input" id="customFile"
            disabled={ loading }
            onChange={ this.handleselectedFile }
            accept=".csv, text/csv" />
        </div>

        <div className="form-row mt-3">
          <div className="form-group col-md-6">
            <label htmlFor="inputDelimiter">Delimitador</label>
            <select id="inputDelimiter" className="form-control"
              value={ selectValue }
              onChange={ (evt) => this.setState({ selectValue: evt.target.value, customDelimiter: '' }) }>
              <option value="dot">Punto</option>
              <option value="carriage">Retorno de carro</option>
              <option value="whitespace">Salto de línea</option>
              <option value="custom">Otro</option>
            </select>
          </div>
          {  selectValue === 'custom' && (
            <div className="form-group col-md-6">
              <label htmlFor="inputCustomDelimiter">Introducir delimitador</label>
              <input type="text" className="form-control" id="inputCustomDelimiter"
                value={ customDelimiter }
                onChange={ (evt) => this.setState({ customDelimiter: evt.target.value }) }/>
            </div>
          )}
        </div>

        <button type="button" className="btn btn-primary mt-3 load-btn"
          disabled={ loading || file === null }
          onClick={ this.loadContent }>
            <ButtonText />
            { loading && (<div className="spinner-border text-light ml-2" role="status">
                  <span className="sr-only">Loading...</span>
                </div>) }
            { !loading && success && (<span className="ml-2"><Icon name="check" /></span>)}
        </button>

        { error !== null && (
            <div className="alert alert-danger mt-3">
              <h4><Icon name="times" before={ true } /> Algo ha salido mal</h4>
              { typeof error.message === 'string' && error.message }
          </div>) }
      </div>
    )
  }

}
