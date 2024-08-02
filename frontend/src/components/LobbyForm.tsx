import { setConnectionState, setGroupname, setSocketId } from '@/reducers/connectionReducer';
import connection, { start } from '@/socket';
import React from 'react';
import { useDispatch } from 'react-redux';

const LobbyForm = () => {
  const dispatch = useDispatch();

  connection.on('joinSuccess', (socketId: string, groupName: number) => { 
    dispatch(setSocketId(socketId))
    dispatch(setGroupname(groupName))
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const code = document.querySelector('input')?.value;

    const connected = await start();
    dispatch(setConnectionState(connected));

    await connection.send('joinLobby', code)
  }

  const handleClick = async () => {
    const connected = await start();
    dispatch(setConnectionState(connected));

    await connection.send('requestLobby');
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