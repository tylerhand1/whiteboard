import Header from '@/components/Header';
import Whiteboard from '@/components/Whiteboard';
import Controls from '@/components/Controls';
import Info from './components/Info';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Info />
        <Whiteboard />
        <Controls />
      </main>
    </>
  );
};

export default App;