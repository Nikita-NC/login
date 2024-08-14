import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// const value = '12';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App props={value} /> */}
    <App/>
  </React.StrictMode>,
);
