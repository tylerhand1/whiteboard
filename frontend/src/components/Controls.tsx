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

  const handleDownloadClick = () => {
    const canvas = document.querySelector('canvas');
    const image = canvas?.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    if (image) {
      const element = document.createElement('a');
      const filename = 'drawing.png';
      element.setAttribute('href', image);
      element.setAttribute('download', filename);
      element.click();
    }
  };

  return (
    <div className='controls-container'>
      <div className='btn-container'>
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
      <div className='btn-container color-picker-container'>
        <button
          value='black'
          style={{ backgroundColor: 'black' }}
          onClick={handleColorClick}
        />
        <button
          value='red'
          style={{ backgroundColor: 'red' }}
          onClick={handleColorClick}
        />
        <button
          value='orange'
          style={{ backgroundColor: 'orange' }}
          onClick={handleColorClick}
        />
        <button
          value='yellow'
          style={{ backgroundColor: 'yellow' }}
          onClick={handleColorClick}
        />
        <button
          value='blue'
          style={{ backgroundColor: 'blue' }}
          onClick={handleColorClick}
        />
        <button
          value='#964B00'
          style={{ backgroundColor: '#964B00' }}
          onClick={handleColorClick}
        />
        <button
          value='green'
          style={{ backgroundColor: 'green' }}
          onClick={handleColorClick}
        />
        <button
          value='white'
          style={{ backgroundColor: 'white' }}
          onClick={handleColorClick}
        />
      </div>
      <button
        onClick={handleDownloadClick}
      >
        Download
      </button>
    </div>
  );
};

export default Controls;