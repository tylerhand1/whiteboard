
import { useSelector } from 'react-redux';

import Header from '@/components/Header';
import LobbyForm from './components/LobbyForm';
import Whiteboard from '@/components/Whiteboard';
import Controls from '@/components/Controls';
import Info from './components/Info';

import { IState } from './types';

const App = () => {
  const connectionState = useSelector((state: IState) => state.connection.connectionState);
  return (
    <>
      <Header />
      <main>
        {connectionState
          ?
          <>
            <Info />
            <Whiteboard />
            <Controls />
          </>
          :
          <>
            <LobbyForm />
          </>
        }

      </main>
    </>
  );
};

export default App;