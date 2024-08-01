import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import sizeReducer from '@/reducers/sizeReducer';
import colorReducer from '@/reducers/colorReducer';

import App from '@/App.tsx';
import '@/stylesheets/index.css';

const store = configureStore({
  reducer: {
    size: sizeReducer,
    color: colorReducer,
  }
});

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
