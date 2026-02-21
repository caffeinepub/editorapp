import { useRef } from 'react';
import { usePhotoEditorStore } from '../store/photoEditorStore';
import { PhotoCanvas } from './PhotoCanvas';
import { FiltersPanel } from './FiltersPanel';
import { StickersPanel } from './StickersPanel';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function DesktopPhotoEditor() {
  const { imageUrl, setImage } = usePhotoEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Menu Bar */}
      <div className="h-12 bg-white/10 backdrop-blur-xl border-b border-white/20 flex items-center px-4 gap-4">
        <Button variant="ghost" size="sm" className="text-white font-bold hover:bg-white/20 shadow-lg">
          File
        </Button>
        <Button variant="ghost" size="sm" className="text-white font-bold hover:bg-white/20 shadow-lg">
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-white font-bold hover:bg-white/20 shadow-lg">
          Export
        </Button>
        <div className="flex-1" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-lg"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 p-2 gap-2 overflow-hidden">
        {/* Center: Image Canvas */}
        <div className="flex-1 flex items-center justify-center">
          {imageUrl ? (
            <PhotoCanvas width={800} height={600} />
          ) : (
            <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-bold text-white shadow-lg">No image loaded</p>
                <p className="text-sm mt-2 text-white/60 shadow-lg">Upload an image to get started</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Panels */}
        <div className="w-80 flex flex-col gap-2">
          <FiltersPanel />
          <StickersPanel />
        </div>
      </div>
    </div>
  );
}
