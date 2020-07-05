import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import App from './App';
import Footer from './Footer';

ReactDOM.render(
  <div style={{margin: 0, padding: 0}}>
    <Header />
    <App />
    <Footer />
  </div>,
  document.getElementById('root')
);

