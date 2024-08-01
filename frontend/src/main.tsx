import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import sizeReducer from '@/reducers/sizeReducer';
import colorReducer from '@/reducers/colorReducer';

import App from '@/App.tsx';
import '@/stylesheets/index.css';

import * as signalR from '@microsoft/signalr';

const store = configureStore({
  reducer: {
    size: sizeReducer,
    color: colorReducer,
  }
});

const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:3000/hub')
  .build();

connection.on('messageReceived', (username: string, message: string) => {
  console.log('received message from', username, ':', message);
});

connection.on('Send', (message : string) => { 
  console.log(message);
});

const start = async () => {
  try {
    await connection.start();
    console.log('SignalR Connected.');
    await connection.send('newMessage', 12345, 'message');
    await connection.invoke('AddToGroup', 'myGroup');
  } catch (err) {
    console.error(err);
  }
};

await start();

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
