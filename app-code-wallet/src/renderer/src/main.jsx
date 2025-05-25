import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

console.log('React initialisé');
console.log('Element root:', document.getElementById('root'));

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('Application rendue');