import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        {/* Wrap the entire app with BrowserRouter only once */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
