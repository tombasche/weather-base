import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { fetchLatestData } from './api/fetchLatestData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App fetchMethod={fetchLatestData} />
  </React.StrictMode>,
);
