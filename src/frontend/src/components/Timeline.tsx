import { useEditorStore } from '../store/editorStore';
import { useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Timeline() {
  const { time, tracks, duration, setTime, selectClip, selectedClipId, updateClip, deleteClip } = useEditorStore();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [draggingClip, setDraggingClip] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const pixelsPerSecond = 50;
  const trackHeight = 60;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 80; // Account for track labels
    const newTime = Math.max(0, Math.min(duration, x / pixelsPerSecond));
    setTime(newTime);
  };

  const handleClipMouseDown = (e: React.MouseEvent, clipId: string) => {
    e.stopPropagation();
    selectClip(clipId);
    setDraggingClip(clipId);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (!draggingClip) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 80 - dragOffset.x;

      const newStart = Math.max(0, x / pixelsPerSecond);
      updateClip(draggingClip, { start: newStart });
    };

    const handleMouseUp = () => {
      setDraggingClip(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingClip, dragOffset, pixelsPerSecond, updateClip]);

  return (
    <div className="h-full bg-gray-900/50 backdrop-blur-sm flex flex-col">
      {/* Timeline Header */}
      <div className="h-10 border-b border-white/10 flex items-center px-4 bg-gray-900/80">
        <span className="text-sm font-medium text-teal-400 shadow-lg">Timeline</span>
        <div className="flex-1" />
        <span className="text-xs text-white/80 font-medium shadow-lg bg-gray-900/80 px-2 py-1 rounded">
          {time.toFixed(2)}s / {duration}s
        </span>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-auto">
        <div 
          ref={timelineRef}
          className="relative h-full min-h-[240px]"
          onClick={handleTimelineClick}
        >
          {/* Time Ruler */}
          <div className="sticky top-0 z-10 h-8 bg-gray-900/90 backdrop-blur-sm border-b border-white/10 flex">
            <div className="w-[80px] border-r border-white/10 flex items-center justify-center text-xs text-white/80 font-medium shadow-lg">
              Tracks
            </div>
            <div className="flex-1 relative">
              {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full border-l border-white/20"
                  style={{ left: `${i * pixelsPerSecond}px` }}
                >
                  <span className="text-xs text-white/80 font-medium ml-1 shadow-lg bg-gray-900/60 px-1 rounded">{i}s</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tracks */}
          <div className="flex">
            {/* Track Labels */}
            <div className="w-[80px] border-r border-white/10">
              {tracks.map((track, idx) => (
                <div
                  key={track.id}
                  className="h-[60px] border-b border-white/5 flex items-center justify-center text-xs text-white/80 font-medium shadow-lg bg-gray-900/30"
                  style={{ 
                    backgroundColor: idx % 2 === 0 ? 'rgba(20, 184, 166, 0.05)' : 'rgba(0, 0, 0, 0.2)' 
                  }}
                >
                  Track {idx + 1}
                </div>
              ))}
              {tracks.length === 0 && (
                <div className="h-[60px] border-b border-white/5 flex items-center justify-center text-xs text-white/60 shadow-lg">
                  No tracks
                </div>
              )}
            </div>

            {/* Clips Area */}
            <div className="flex-1 relative" style={{ minWidth: `${duration * pixelsPerSecond}px` }}>
              {/* Track Backgrounds */}
              {tracks.map((track, idx) => (
                <div
                  key={track.id}
                  className="absolute w-full border-b border-white/5"
                  style={{ 
                    top: `${idx * trackHeight}px`,
                    height: `${trackHeight}px`,
                    backgroundColor: idx % 2 === 0 ? 'rgba(20, 184, 166, 0.03)' : 'transparent'
                  }}
                />
              ))}

              {/* Clips */}
              {tracks.map((track, trackIdx) => (
                track.clips.map(clip => (
                  <div
                    key={clip.id}
                    className={`absolute h-12 rounded cursor-move flex items-center px-2 text-xs font-medium transition-all ${
                      selectedClipId === clip.id 
                        ? 'bg-teal-500 text-white ring-2 ring-teal-400 shadow-lg' 
                        : 'bg-teal-600/80 text-white hover:bg-teal-500/90 shadow-lg'
                    }`}
                    style={{
                      left: `${clip.start * pixelsPerSecond}px`,
                      width: `${clip.duration * pixelsPerSecond}px`,
                      top: `${trackIdx * trackHeight + 4}px`
                    }}
                    onMouseDown={(e) => handleClipMouseDown(e, clip.id)}
                  >
                    <span className="truncate flex-1 shadow-lg">
                      {clip.type || 'Clip'} {clip.id.slice(-4)}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClip(clip.id);
                      }}
                      className="h-6 w-6 ml-1 hover:bg-red-500/30"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              ))}

              {/* Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-amber-500 pointer-events-none z-20 shadow-lg"
                style={{ left: `${time * pixelsPerSecond}px` }}
              >
                <div className="absolute -top-2 -left-1.5 w-3 h-3 bg-amber-500 rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
