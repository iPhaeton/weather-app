import "./css/main.css";
import "../index.html";

import React from 'react';
import ReactDOM from 'react-dom';

import App from "./containers/App";

import reducers from './reducers.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App/>
    </Provider>,
    document.getElementById('react-container'));