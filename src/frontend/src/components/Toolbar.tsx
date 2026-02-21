import { Play, Pause, Image, Type, Square, Sparkles, Download, Save, FolderOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '../store/editorStore';
import { useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

type ToolbarProps = {
  onOpenProjects: () => void;
  onOpenExport: () => void;
};

export default function Toolbar({ onOpenProjects, onOpenExport }: ToolbarProps) {
  const { playing, setPlaying, addClip, fps, resolution, setFps, setResolution } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      alert('Please upload an image or video file');
      return;
    }

    const url = URL.createObjectURL(file);
    const newClip = {
      id: `clip-${Date.now()}`,
      start: 0,
      duration: 5,
      type: isImage ? 'image' as const : 'video' as const,
      mediaUrl: url,
      mediaType: file.type,
      transform: {
        x: [{ time: 0, value: 0 }],
        y: [{ time: 0, value: 0 }],
        scale: [{ time: 0, value: 1 }],
        rotation: [{ time: 0, value: 0 }],
        opacity: [{ time: 0, value: 1 }]
      },
      effects: []
    };

    addClip(newClip);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddText = () => {
    const newClip = {
      id: `clip-${Date.now()}`,
      start: 0,
      duration: 5,
      type: 'text' as const,
      content: 'New Text',
      font: 'Arial',
      fontSize: 48,
      color: '#ffffff',
      transform: {
        x: [{ time: 0, value: 0 }],
        y: [{ time: 0, value: 0 }],
        scale: [{ time: 0, value: 1 }],
        rotation: [{ time: 0, value: 0 }],
        opacity: [{ time: 0, value: 1 }]
      },
      effects: []
    };
    addClip(newClip);
  };

  const handleAddShape = () => {
    const newClip = {
      id: `clip-${Date.now()}`,
      start: 0,
      duration: 5,
      type: 'shape' as const,
      shapeType: 'rectangle' as const,
      fillColor: '#14b8a6',
      strokeColor: '#ffffff',
      strokeWidth: 2,
      transform: {
        x: [{ time: 0, value: 0 }],
        y: [{ time: 0, value: 0 }],
        scale: [{ time: 0, value: 1 }],
        rotation: [{ time: 0, value: 0 }],
        opacity: [{ time: 0, value: 1 }]
      },
      effects: []
    };
    addClip(newClip);
  };

  return (
    <div className="h-14 border-b border-white/10 bg-gray-900/80 backdrop-blur-md flex items-center px-4 gap-2">
      {/* Playback Controls */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePlayPause}
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>

      <Separator orientation="vertical" className="h-8 bg-white/10" />

      {/* Media Controls */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaUpload}
        className="hidden"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        <Image className="h-4 w-4 mr-2" />
        Media
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleAddText}
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        <Type className="h-4 w-4 mr-2" />
        Text
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleAddShape}
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        <Square className="h-4 w-4 mr-2" />
        Shape
      </Button>

      <Separator orientation="vertical" className="h-8 bg-white/10" />

      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Effects
      </Button>

      <Separator orientation="vertical" className="h-8 bg-white/10" />

      {/* Project Settings */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            {fps} fps • {resolution[0]}x{resolution[1]}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gray-900 border-white/10">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-teal-400">Project Settings</h4>
              <p className="text-xs text-muted-foreground">Configure frame rate and resolution</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Frame Rate (FPS)</Label>
                <Select value={fps.toString()} onValueChange={(v) => setFps(parseInt(v))}>
                  <SelectTrigger className="h-8 bg-gray-800/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 fps</SelectItem>
                    <SelectItem value="60">60 fps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Resolution</Label>
                <Select 
                  value={`${resolution[0]}x${resolution[1]}`} 
                  onValueChange={(v) => {
                    const [w, h] = v.split('x').map(Number);
                    setResolution([w, h]);
                  }}
                >
                  <SelectTrigger className="h-8 bg-gray-800/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                    <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                    <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex-1" />

      {/* Project Controls */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenProjects}
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        <FolderOpen className="h-4 w-4 mr-2" />
        Load
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>

      <Button
        variant="default"
        size="sm"
        onClick={onOpenExport}
        className="bg-amber-600 hover:bg-amber-700 text-white transition-colors"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
}
