import { usePhotoEditorStore } from '../store/photoEditorStore';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export function FiltersPanel() {
  const { filters, updateFilter, resetFilters } = usePhotoEditorStore();

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white shadow-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-white hover:bg-white/20 shadow-lg"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {/* Brightness */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold text-white shadow-lg">Brightness</Label>
            <span className="text-sm text-white/80 font-medium shadow-lg">{filters.brightness}</span>
          </div>
          <Slider
            value={[filters.brightness]}
            onValueChange={([value]) => updateFilter('brightness', value)}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Contrast */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold text-white shadow-lg">Contrast</Label>
            <span className="text-sm text-white/80 font-medium shadow-lg">{filters.contrast}</span>
          </div>
          <Slider
            value={[filters.contrast]}
            onValueChange={([value]) => updateFilter('contrast', value)}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Saturation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold text-white shadow-lg">Saturation</Label>
            <span className="text-sm text-white/80 font-medium shadow-lg">{filters.saturation}</span>
          </div>
          <Slider
            value={[filters.saturation]}
            onValueChange={([value]) => updateFilter('saturation', value)}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Blur */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold text-white shadow-lg">Blur</Label>
            <span className="text-sm text-white/80 font-medium shadow-lg">{filters.blur}</span>
          </div>
          <Slider
            value={[filters.blur]}
            onValueChange={([value]) => updateFilter('blur', value)}
            min={0}
            max={10}
            step={0.5}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
