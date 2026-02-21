import { useRef } from 'react';
import { usePhotoEditorStore } from '../store/photoEditorStore';
import { PhotoCanvas } from './PhotoCanvas';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, Sliders } from 'lucide-react';

export function MobilePhotoEditor() {
  const { imageUrl, setImage, updateFilter } = usePhotoEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white flex flex-col space-y-4">
      {/* Image Canvas */}
      <div className="w-full aspect-[9/16] max-h-[60vh]">
        {imageUrl ? (
          <PhotoCanvas width={360} height={640} />
        ) : (
          <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-bold text-white shadow-lg">No image loaded</p>
              <p className="text-xs mt-1 text-white/60 shadow-lg">Upload an image to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex overflow-x-auto gap-2 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateFilter('brightness', 120)}
          className="text-white font-bold hover:bg-white/20 shadow-lg whitespace-nowrap"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          Bright
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateFilter('contrast', 120)}
          className="text-white font-bold hover:bg-white/20 shadow-lg whitespace-nowrap"
        >
          <Sliders className="h-4 w-4 mr-1" />
          Contrast
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateFilter('saturation', 150)}
          className="text-white font-bold hover:bg-white/20 shadow-lg whitespace-nowrap"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          Vibrant
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateFilter('blur', 2)}
          className="text-white font-bold hover:bg-white/20 shadow-lg whitespace-nowrap"
        >
          <Sliders className="h-4 w-4 mr-1" />
          Blur
        </Button>
      </div>

      {/* Upload Button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-6 shadow-lg"
      >
        <Upload className="h-5 w-5 mr-2" />
        Upload Image
      </Button>
    </div>
  );
}
