
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

  const windowWidth = window.innerWidth;

  const tooSmall = windowWidth < 1080;

  return (
    <>
      <Header />
      <main>
        {tooSmall ?
        <h2 className='device-error'>Sorry, this device is not supported on this site</h2>
        :
        connectionState && isLoaded
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