import "./css/main.css";
import "../index.html";

import React from 'react';
import ReactDOM from 'react-dom';

import App from "./containers/App";

import reducers from './reducers.js';

ReactDOM.render(<App/>, document.getElementById('react-container'));