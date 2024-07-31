import React from 'react';
import { useDispatch } from 'react-redux';
import { changeSize } from '@/reducers/sizeReducer';
import { changeColor } from '@/reducers/colorReducer';

const Controls = () => {
  const dispatch = useDispatch();

  const handleSizeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLInputElement;
    const size = Number.parseInt(button.value);
    dispatch(changeSize(size));
  };

  const handleColorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLInputElement;
    const color = button.value;
    dispatch(changeColor(color));
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
        <button
          value='15'
          onClick={handleSizeClick}
        >
          Extra Large
        </button>
      </div>
      <div className='color-picker-container'>
        <button
          value='black'
          onClick={handleColorClick}
        >
          Black
        </button>
        <button
          value='red'
          onClick={handleColorClick}
        >
          Red
        </button>
        <button
          value='orange'
          onClick={handleColorClick}
        >
          Orange
        </button>
        <button
          value='yellow'
          onClick={handleColorClick}
        >
          Yellow
        </button>
        <button
          value='blue'
          onClick={handleColorClick}
        >
          Blue
        </button>
        <button
          value='#964B00'
          onClick={handleColorClick}
        >
          Brown
        </button>
        <button
          value='green'
          onClick={handleColorClick}
        >
          Green
        </button>
        <button
          value='white'
          onClick={handleColorClick}
        >
          White
        </button>
      </div>
      <div className='download-btn-container'>
        <button>Download</button>
      </div>
    </div>
  );
};

export default Controls;