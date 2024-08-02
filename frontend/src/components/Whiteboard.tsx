import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IDrawArgs, IState } from '@/types';
import connection from '@/socket';

const Whiteboard = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const markerSize = useSelector((state: IState) => state.size);
  const markerColor = useSelector((state: IState) => state.color);

  useEffect(() => {
    const canvasElement: HTMLCanvasElement | null = document.querySelector('#whiteboard-canvas');
    setCanvas(canvasElement);
    if (canvas) {
      const ctxFound: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (ctxFound) {
        ctxFound.lineCap = 'round';
        ctxFound.fillStyle = 'white';
        ctxFound.fillRect(0, 0, canvas.width, canvas.height);
        setCtx(ctxFound);
      }
    }
  }, [canvas, setCanvas, ctx, setCtx]);

  useEffect(() => {
    if (ctx)
      ctx.strokeStyle = markerColor;
  }, [ctx, markerColor]);

  useEffect(() => {
    if (ctx)
      ctx.lineWidth = markerSize;
  }, [ctx, markerSize]);

  connection.on('draw', (drawArgs: IDrawArgs) => {
    if (ctx) {
      ctx.lineWidth = drawArgs.lineWidth;
      ctx.strokeStyle = drawArgs.strokeStyle;
      ctx.beginPath();
      ctx.moveTo(drawArgs.prevX, drawArgs.prevY);
      ctx.lineTo(drawArgs.currentX, drawArgs.currentY);
      ctx.stroke();
    }
  });

  const handleMouseDown = async (event: React.MouseEvent<HTMLElement>) => {
    if (canvas === null || ctx === null) {
      return;
    }
    setMouseDown(true);

    const { clientX, clientY, button } = event;
    const leftOffset: number = canvas.getBoundingClientRect().left;
    const topOffset: number = canvas.getBoundingClientRect().top;

    setMousePosition({
      x: clientX - leftOffset,
      y: clientY - topOffset,
    });

    if (button === 0) { // left mouse
      ctx.lineWidth = markerSize;
      ctx.strokeStyle = markerColor;
      ctx.beginPath();

      ctx.moveTo(clientX - leftOffset, clientY - topOffset);
      ctx.lineTo(clientX - leftOffset, clientY - topOffset);
      ctx.stroke();

      await connection.send('draw', {
        prevX: clientX - leftOffset,
        prevY: clientY - topOffset,
        currentX: clientX - leftOffset,
        currentY: clientY - topOffset,
        lineWidth: markerSize,
        strokeStyle: markerColor,
      });
    }
  };

  const handleMouseMove = async (event: React.MouseEvent<HTMLElement>) => {
    if (!mouseDown || canvas === null || ctx === null) {
      return;
    }

    const { clientX, clientY, button } = event;
    const leftOffset: number = canvas.getBoundingClientRect().left;
    const topOffset: number = canvas.getBoundingClientRect().top;

    if (button === 0) { // left mouse
      ctx.lineWidth = markerSize;
      ctx.strokeStyle = markerColor;
      ctx.beginPath();

      ctx.moveTo(mousePosition.x, mousePosition.y);
      setMousePosition({
        x: clientX - leftOffset,
        y: clientY - topOffset,
      });
      ctx.lineTo(clientX - leftOffset, clientY - topOffset);
      ctx.stroke();

      await connection.send('draw', {
        prevX: mousePosition.x,
        prevY: mousePosition.y,
        currentX: clientX - leftOffset,
        currentY: clientY - topOffset,
        lineWidth: markerSize,
        strokeStyle: markerColor,
      });
    }
  };

  return (
    <canvas
      id='whiteboard-canvas'
      className='whiteboard-canvas'
      onMouseDown={e => { void handleMouseDown(e); }}
      onMouseUp={() => { setMouseDown(false); }}
      onMouseLeave={() => { setMouseDown(false); }}
      onMouseMove={e => { void handleMouseMove(e); }}
      width={918}
      height={512}
    />
  );
};

export default Whiteboard;