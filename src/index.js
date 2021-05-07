import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import Auth0History from './Auth0History';

document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");



ReactDOM.render(
  <React.StrictMode>
  <Auth0History>
    <App />
    </Auth0History>
  </React.StrictMode>,
  document.getElementById('root')
);
