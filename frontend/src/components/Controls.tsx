import React from 'react';
import { useDispatch } from 'react-redux';
import { changeSize } from '@/reducers/sizeReducer';

const Controls = () => {
  const dispatch = useDispatch();

  const handleSizeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLInputElement;
    const size = Number.parseInt(button.value);
    dispatch(changeSize(size));
  };

  return (
    <div className='controls-container'>
      <div className='size-picker-container'>
        <button
          value='2'
          onClick={handleSizeClick}
        >
          Small
        </button>
        <button
          value='5'
          onClick={handleSizeClick}
        >
          Medium
        </button>
        <button
          value='10'
          onClick={handleSizeClick}
        >
          Large
        </button>
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