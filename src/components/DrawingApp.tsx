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

  const downloadCanvas = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/png");

      // Create a new canvas to set the background color to white
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");

      if (tempContext) {
        tempCanvas.width = canvasRef.current.width;
        tempCanvas.height = canvasRef.current.height;

        // Fill the temporary canvas with a white background
        tempContext.fillStyle = "#ffffff"; // White color
        tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Draw the original canvas content on top of the white background
        tempContext.drawImage(canvasRef.current, 0, 0);

        // Convert the temporary canvas to a data URL for download
        const tempDataURL = tempCanvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = tempDataURL;
        a.download = "drawing.png";
        a.click();
      }
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
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={downloadCanvas}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default DrawingApp;
