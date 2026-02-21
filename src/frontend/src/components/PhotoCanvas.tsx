import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { usePhotoEditorStore } from '../store/photoEditorStore';

interface PhotoCanvasProps {
  width?: number;
  height?: number;
}

export interface PhotoCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
  exportImage: () => string | null;
}

export const PhotoCanvas = forwardRef<PhotoCanvasRef, PhotoCanvasProps>(
  ({ width = 800, height = 600 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const { imageUrl, filters, stickers } = usePhotoEditorStore();

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      exportImage: () => {
        return canvasRef.current?.toDataURL('image/png') || null;
      }
    }));

    // Load image
    useEffect(() => {
      if (!imageUrl) {
        setImage(null);
        return;
      }

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImage(img);
      };
    }, [imageUrl]);

    // Render canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply filters
      const filterString = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px)`;
      ctx.filter = filterString;

      // Draw image
      if (image) {
        ctx.drawImage(image, 0, 0, width, height);
      }

      // Reset filter for stickers
      ctx.filter = 'none';

      // Draw stickers
      stickers.forEach((sticker) => {
        ctx.font = `${sticker.height}px Arial`;
        ctx.fillText(sticker.src, sticker.x, sticker.y + sticker.height);
      });
    }, [image, filters, stickers, width, height]);

    return (
      <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="rounded-xl bg-gray-800 max-w-full max-h-full object-contain"
        />
      </div>
    );
  }
);

PhotoCanvas.displayName = 'PhotoCanvas';
