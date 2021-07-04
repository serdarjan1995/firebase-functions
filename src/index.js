import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UploadFile from './UploadFile';
import Navbar from './Navbar';
import {BrowserRouter, Switch, Route} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Navbar />
          <Switch>
              <Route path="/" exact component={App} />
              <Route path="/upload" exact component={UploadFile} />
          </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
