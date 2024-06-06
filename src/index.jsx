import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import '@fortawesome/fontawesome-free/css/all.css';  // Import FontAwesome CSS

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
