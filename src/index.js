import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
