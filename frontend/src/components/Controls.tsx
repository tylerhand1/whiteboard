const Controls = () => {
  return (
    <div className='controls-container'>
      <div className='size-picker-container'>
        <button>Small</button>
        <button>Medium</button>
        <button>Large</button>
      </div>
      <div className='color-picker-container'>
        <button>Black</button>
        <button>Red</button>
        <button>Orange</button>
        <button>Yellow</button>
        <button>Blue</button>
        <button>Brown</button>
        <button>Green</button>
        <button>White</button>
      </div>
      <div className='download-btn-container'>
        <button>Download</button>
      </div>
    </div>
  );
};

export default Controls;