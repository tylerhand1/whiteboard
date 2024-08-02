import { setConnectionState, setGroupname, setSocketId } from '@/reducers/connectionReducer';
import connection, { start } from '@/socket';
import { useDispatch } from 'react-redux';

const LobbyForm = () => {
  const dispatch = useDispatch();

  connection.on('joinSuccess', (socketId: string, groupName: number) => { 
    dispatch(setSocketId(socketId))
    dispatch(setGroupname(groupName))
  });

  const handleClick = async () => {
    const connected = await start();
    dispatch(setConnectionState(connected));

    await connection.send('requestJoin');
  }

  return (
    <div className='lobby-join-create-container'>
      <input
        type='tel'
        placeholder='Lobby Code'
        autoFocus
      />
      <h2>or</h2>
      <button onClick={handleClick}>
        Create new lobby
      </button>
    </div>
  );
};

export default LobbyForm;