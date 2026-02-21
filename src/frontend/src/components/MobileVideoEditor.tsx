import { useEditorStore } from '../store/editorStore';
import { VideoPlayer } from './VideoPlayer';
import Timeline from './Timeline';
import { Button } from '@/components/ui/button';
import { Scissors, Split, Type, Sticker, Music, Sparkles } from 'lucide-react';

export function MobileVideoEditor() {
  const { tracks, time } = useEditorStore();

  // Get first active video clip for preview
  const activeClip = tracks
    .flatMap(track => track.clips)
    .find(clip => clip.type === 'video' && clip.start <= time && clip.start + clip.duration >= time);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4 space-y-4">
      {/* Video Preview */}
      <div className="w-full aspect-video bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center">
        {activeClip?.mediaUrl ? (
          <VideoPlayer src={activeClip.mediaUrl} width={360} height={640} />
        ) : (
          <div className="text-center text-white/60">
            <p className="text-sm font-medium shadow-lg text-white">No video loaded</p>
            <p className="text-xs mt-1 shadow-lg text-white/70">Upload a video to get started</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="h-32 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-x-auto">
        <Timeline />
      </div>

      {/* Toolbar */}
      <div className="flex justify-around p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-3 px-4 text-white hover:bg-white/20 shadow-lg"
        >
          <Scissors className="h-6 w-6 mb-1" />
          <span className="text-xs font-bold shadow-lg">Trim</span>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-3 px-4 text-white hover:bg-white/20 shadow-lg"
        >
          <Split className="h-6 w-6 mb-1" />
          <span className="text-xs font-bold shadow-lg">Split</span>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-3 px-4 text-white hover:bg-white/20 shadow-lg"
        >
          <Type className="h-6 w-6 mb-1" />
          <span className="text-xs font-bold shadow-lg">Text</span>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-3 px-4 text-white hover:bg-white/20 shadow-lg"
        >
          <Sticker className="h-6 w-6 mb-1" />
          <span className="text-xs font-bold shadow-lg">Stickers</span>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-3 px-4 text-white hover:bg-white/20 shadow-lg"
        >
          <Music className="h-6 w-6 mb-1" />
          <span className="text-xs font-bold shadow-lg">Music</span>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex-col h-auto py-3 px-4 text-white hover:bg-white/20 shadow-lg"
        >
          <Sparkles className="h-6 w-6 mb-1" />
          <span className="text-xs font-bold shadow-lg">AI</span>
        </Button>
      </div>
    </div>
  );
}
