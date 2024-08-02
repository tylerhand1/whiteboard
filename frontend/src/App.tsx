
import { useSelector } from 'react-redux';

import Header from '@/components/Header';
import LobbyForm from '@/components/LobbyForm';
import Whiteboard from '@/components/Whiteboard';
import Controls from '@/components/Controls';
import Info from '@/components/Info';
import ErrorMessage from '@/components/ErrorMessage';

import { IState } from '@/types';

const App = () => {
  const connectionState = useSelector((state: IState) => state.connection.connectionState);
  const isLoaded = useSelector((state: IState) => state.connection.isLoaded);

  return (
    <>
      <Header />
      <main>
        {connectionState && isLoaded
          ?
          <>
            <Info />
            <Whiteboard />
            <Controls />
          </>
          :
          <>
            <ErrorMessage />
            <LobbyForm />
          </>
        }

      </main>
    </>
  );
};

export default App;