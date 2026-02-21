import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { exportProject } from '../engine/ExportEngine';
import { Download } from 'lucide-react';

type ExportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const state = useEditorStore();
  const [format, setFormat] = useState<'video' | 'gif' | 'images' | 'json'>('json');
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    setExporting(true);
    setProgress(0);

    try {
      await exportProject(state, format, (p) => setProgress(p));
      onOpenChange(false);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-amber-400">Export Project</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your export format and settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Info */}
          <div className="p-3 rounded-lg bg-gray-800/50 border border-white/10 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Resolution:</span>
              <span className="text-teal-400 font-medium">{state.resolution[0]}x{state.resolution[1]}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frame Rate:</span>
              <span className="text-teal-400 font-medium">{state.fps} fps</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-teal-400 font-medium">{state.duration}s</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v as any)}>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-white/10">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex-1 cursor-pointer">
                  <div className="font-medium">Project JSON</div>
                  <div className="text-xs text-muted-foreground">Save project data for later editing</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-white/10 opacity-50">
                <RadioGroupItem value="video" id="video" disabled />
                <Label htmlFor="video" className="flex-1">
                  <div className="font-medium">Video (MP4)</div>
                  <div className="text-xs text-muted-foreground">Coming soon</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-white/10 opacity-50">
                <RadioGroupItem value="gif" id="gif" disabled />
                <Label htmlFor="gif" className="flex-1">
                  <div className="font-medium">Animated GIF</div>
                  <div className="text-xs text-muted-foreground">Coming soon</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-white/10 opacity-50">
                <RadioGroupItem value="images" id="images" disabled />
                <Label htmlFor="images" className="flex-1">
                  <div className="font-medium">Image Sequence</div>
                  <div className="text-xs text-muted-foreground">Coming soon</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {exporting && (
            <div className="space-y-2">
              <Label className="text-sm">Exporting...</Label>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">{progress.toFixed(0)}%</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={exporting}
              className="flex-1 border-white/10 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={exporting}
              className="flex-1 bg-amber-600 hover:bg-amber-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
