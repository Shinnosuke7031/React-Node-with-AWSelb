import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import App from './App';

ReactDOM.render(
  <div style={{margin: 0, padding: 0}}>
    <Header />
    <App />
  </div>,
  document.getElementById('root')
);

