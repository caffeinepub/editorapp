import { useEditorStore } from '../store/editorStore';
import Preview from './Preview';
import Timeline from './Timeline';
import Inspector from './Inspector';
import { Button } from '@/components/ui/button';

export function DesktopVideoEditor() {
  const { tracks, selectedClipId } = useEditorStore();

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
          Composition
        </Button>
        <Button variant="ghost" size="sm" className="text-white font-bold hover:bg-white/20 shadow-lg">
          Effects
        </Button>
        <Button variant="ghost" size="sm" className="text-white font-bold hover:bg-white/20 shadow-lg">
          Render
        </Button>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 p-2 gap-2 overflow-hidden">
        {/* Left: Video Preview */}
        <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 flex items-center justify-center">
          <Preview isMobile={false} />
        </div>

        {/* Right: Layers + Effects */}
        <div className="w-80 flex flex-col gap-2">
          {/* Layers Panel */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 shadow-lg">Layers</h2>
            <ul className="space-y-2">
              {tracks.map((track, idx) => (
                <li key={track.id} className="space-y-1">
                  <div className="text-sm font-bold text-white/80 shadow-lg">Track {idx + 1}</div>
                  {track.clips.map(clip => (
                    <div
                      key={clip.id}
                      className={`text-xs p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors ${
                        selectedClipId === clip.id ? 'ring-2 ring-teal-500' : ''
                      }`}
                    >
                      <span className="text-white font-medium shadow-lg">
                        {clip.type || 'Clip'} {clip.id.slice(-4)}
                      </span>
                    </div>
                  ))}
                </li>
              ))}
              {tracks.length === 0 && (
                <li className="text-sm text-white/60 text-center py-4 shadow-lg">No layers yet</li>
              )}
            </ul>
          </div>

          {/* Effects Panel */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 overflow-y-auto">
            <Inspector />
          </div>
        </div>
      </div>

      {/* Bottom Timeline */}
      <div className="h-64 bg-white/10 backdrop-blur-xl border-t border-white/20">
        <Timeline />
      </div>
    </div>
  );
}
