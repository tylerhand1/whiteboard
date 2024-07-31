import Header from '@/components/Header';
import Whiteboard from '@/components/Whiteboard';
import Controls from '@/components/Controls';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Whiteboard />
        <Controls />
      </main>
    </>
  );
};

export default App;