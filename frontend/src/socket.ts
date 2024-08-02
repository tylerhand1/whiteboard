import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:3000/hub')
  .build();

connection.on('Send', (message : string) => {
  console.log('from send', message);
});

export const start = async (): Promise<boolean> => {
  try {
    await connection.start();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default connection;