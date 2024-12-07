import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'core-js';
import store from './store';
import App from './App';

// Renderizar la aplicación React
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
