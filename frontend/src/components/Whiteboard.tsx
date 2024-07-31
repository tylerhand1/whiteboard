import React, { useEffect, useState } from 'react';

const Whiteboard = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canvasElement: HTMLCanvasElement | null = document.querySelector('#whiteboard-canvas');
    setCanvas(canvasElement);
    if (canvas) {
      const ctxFound: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (ctxFound) {
        ctxFound.lineCap = 'round';
        setCtx(ctxFound);
      }
    }
  }, [canvas, setCanvas, ctx, setCtx]);

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (canvas === null || ctx === null) {
      return;
    }
    setMouseDown(true);

    const { clientX, clientY } = event;
    const leftOffset: number = canvas.getBoundingClientRect().left;
    const topOffset: number = canvas.getBoundingClientRect().top;
    setMousePosition({
      x: clientX - leftOffset,
      y: clientY - topOffset,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!mouseDown || canvas === null || ctx === null) {
      return;
    }

    const { clientX, clientY, button } = event;
    const leftOffset: number = canvas.getBoundingClientRect().left;
    const topOffset: number = canvas.getBoundingClientRect().top;

    if (button === 0) { // left mouse
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();

      ctx.moveTo(mousePosition.x, mousePosition.y);
      setMousePosition({
        x: clientX - leftOffset,
        y: clientY - topOffset,
      });
      ctx.lineTo(clientX - leftOffset, clientY - topOffset);
      ctx.stroke();
    }
  };

  return (
    <main>
      <canvas
        id='whiteboard-canvas'
        className='whiteboard-canvas'
        onMouseDown={handleMouseDown}
        onMouseUp={() => { setMouseDown(false); }}
        onMouseLeave={() => { setMouseDown(false); }}
        onMouseMove={handleMouseMove}
        width={918}
        height={512}
      />
    </main>
  );
};

export default Whiteboard;