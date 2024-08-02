import { setConnectionState, setGroupname, setSocketId, resetConnection, setIsLoaded, setError } from '@/reducers/connectionReducer';
import connection, { start } from '@/socket';
import React from 'react';
import { useDispatch } from 'react-redux';

const LobbyForm = () => {
  const dispatch = useDispatch();

  connection.on('joinSuccess', (socketId: string, groupName: number) => {
    dispatch(setSocketId(socketId))
    dispatch(setGroupname(groupName))
    dispatch(setIsLoaded(true));
  });

  connection.on('joinfail', (_message: string) => {
    dispatch(resetConnection());
    connection.stop();

   dispatch(setError(true));
   setTimeout(() => {
    dispatch(setError(false))
   }, 5 * 1000);
  })

  const startConnection = async () => {
    const connected = await start();
    dispatch(setConnectionState(connected));
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const code = document.querySelector('input')?.value;

    await startConnection();

    await connection.send('joinLobby', code)
  }

  const handleClick = async () => {
    await startConnection();

    await connection.send('requestLobby');
    dispatch(setIsLoaded(true));
  }

  return (
    <div className='lobby-join-create-container'>
      <form onSubmit={handleSubmit}>
        <input
          type='tel'
          placeholder='Lobby Code'
          autoFocus
        />
      </form>
      <h2>or</h2>
      <button onClick={handleClick}>
        Create new lobby
      </button>
    </div>
  );
};

export default LobbyForm;