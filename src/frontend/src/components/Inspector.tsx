import { useEditorStore, Clip } from '../store/editorStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { CoreEngine } from '../engine/CoreEngine';
import { useMemo } from 'react';

export default function Inspector() {
  const { selectedClipId, tracks, time, updateClip } = useEditorStore();
  
  // Find selected clip across all tracks
  let selectedClip: Clip | null = null;
  for (const track of tracks) {
    const clip = track.clips.find(c => c.id === selectedClipId);
    if (clip) {
      selectedClip = clip;
      break;
    }
  }
  
  const coreEngine = useMemo(() => new CoreEngine(), []);

  if (!selectedClip) {
    return (
      <div className="h-full bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Select a clip to edit properties</p>
        </div>
      </div>
    );
  }

  const currentTransform = coreEngine.renderClip(selectedClip, time);

  const addKeyframe = (property: 'x' | 'y' | 'scale' | 'rotation' | 'opacity') => {
    if (!selectedClip) return;
    const localTime = time - selectedClip.start;
    const currentValue = currentTransform[property];
    const newKeyframes = [...selectedClip.transform[property], { time: localTime, value: currentValue }]
      .sort((a, b) => a.time - b.time);
    
    updateClip(selectedClip.id, {
      transform: {
        ...selectedClip.transform,
        [property]: newKeyframes
      }
    });
  };

  const deleteKeyframe = (property: 'x' | 'y' | 'scale' | 'rotation' | 'opacity', index: number) => {
    if (!selectedClip) return;
    const newKeyframes = selectedClip.transform[property].filter((_, i) => i !== index);
    updateClip(selectedClip.id, {
      transform: {
        ...selectedClip.transform,
        [property]: newKeyframes
      }
    });
  };

  return (
    <ScrollArea className="h-full bg-gray-900/50 backdrop-blur-sm">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-teal-400">Inspector</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedClip.type || 'Clip'} Properties
          </p>
        </div>

        <Separator className="bg-white/10" />

        {/* Timing Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Timing</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Start (s)</Label>
              <Input
                type="number"
                step="0.1"
                value={selectedClip.start}
                onChange={(e) => updateClip(selectedClip.id, { start: parseFloat(e.target.value) || 0 })}
                className="h-8 bg-gray-800/50 border-white/10 focus:border-teal-500"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Duration (s)</Label>
              <Input
                type="number"
                step="0.1"
                value={selectedClip.duration}
                onChange={(e) => updateClip(selectedClip.id, { duration: parseFloat(e.target.value) || 1 })}
                className="h-8 bg-gray-800/50 border-white/10 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Transform Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Transform</h3>
          
          {(['x', 'y', 'scale', 'rotation', 'opacity'] as const).map(prop => (
            <div key={prop} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground capitalize">{prop}</Label>
                <span className="text-xs text-teal-400">{currentTransform[prop].toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addKeyframe(prop)}
                  className="flex-1 h-7 text-xs bg-gray-800/50 border-white/10 hover:bg-teal-500/20 hover:border-teal-500"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Keyframe
                </Button>
              </div>
              {selectedClip.transform[prop].length > 0 && (
                <div className="space-y-1 pl-2 border-l-2 border-teal-500/30">
                  {selectedClip.transform[prop].map((kf, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground w-12">{kf.time.toFixed(1)}s</span>
                      <span className="text-foreground flex-1">{kf.value.toFixed(2)}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteKeyframe(prop, idx)}
                        className="h-5 w-5 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Text Properties */}
        {selectedClip.type === 'text' && (
          <>
            <Separator className="bg-white/10" />
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Text</h3>
              <div>
                <Label className="text-xs text-muted-foreground">Content</Label>
                <Textarea
                  value={selectedClip.content || ''}
                  onChange={(e) => updateClip(selectedClip.id, { content: e.target.value })}
                  className="min-h-[60px] bg-gray-800/50 border-white/10 focus:border-teal-500"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Font Size</Label>
                <Input
                  type="number"
                  value={selectedClip.fontSize || 48}
                  onChange={(e) => updateClip(selectedClip.id, { fontSize: parseInt(e.target.value) || 48 })}
                  className="h-8 bg-gray-800/50 border-white/10 focus:border-teal-500"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Color</Label>
                <Input
                  type="color"
                  value={selectedClip.color || '#ffffff'}
                  onChange={(e) => updateClip(selectedClip.id, { color: e.target.value })}
                  className="h-8 bg-gray-800/50 border-white/10"
                />
              </div>
            </div>
          </>
        )}

        {/* Shape Properties */}
        {selectedClip.type === 'shape' && (
          <>
            <Separator className="bg-white/10" />
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Shape</h3>
              <div>
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Select
                  value={selectedClip.shapeType || 'rectangle'}
                  onValueChange={(value) => updateClip(selectedClip.id, { shapeType: value as any })}
                >
                  <SelectTrigger className="h-8 bg-gray-800/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rectangle">Rectangle</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="triangle">Triangle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Fill Color</Label>
                <Input
                  type="color"
                  value={selectedClip.fillColor || '#14b8a6'}
                  onChange={(e) => updateClip(selectedClip.id, { fillColor: e.target.value })}
                  className="h-8 bg-gray-800/50 border-white/10"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Stroke Color</Label>
                <Input
                  type="color"
                  value={selectedClip.strokeColor || '#ffffff'}
                  onChange={(e) => updateClip(selectedClip.id, { strokeColor: e.target.value })}
                  className="h-8 bg-gray-800/50 border-white/10"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
