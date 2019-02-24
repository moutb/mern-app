import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import MainComponent from './components/main';
import CSVImportComponent from './components/csv-import';

import logo from './logo.svg';
import './App.scss';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src={logo} width="30" height="30" alt="MERN App" />
              MERN App
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/import" className="nav-link">Importar desde CSV</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ MainComponent } />
          <Route path="/import" exact component={ CSVImportComponent } />
          {/*<Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />*/}
        </div>
      </Router>
    );
  }
}

export default App;
