import React, { useState, useRef, useEffect } from "react";

const DrawingApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(2);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        setContext(ctx);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    if (context) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setIsDrawing(true);
    }
  };

  const endDrawing = () => {
    if (context) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    if (context) {
      context.strokeStyle = color;
    }
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    if (context) {
      context.lineWidth = size;
    }
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Drawing App</h1>

      <div className="flex items-center mb-4">
        <label className="mr-2">Color:</label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="mr-2">Brush Size:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={brushSize}
          onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
        />
        <span className="ml-2">{brushSize}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-gray-300"
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
      />

      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DrawingApp;
