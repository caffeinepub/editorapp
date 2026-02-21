import { create } from 'zustand';

export type Keyframe = {
  time: number;
  value: number;
};

export type EffectInstance = {
  name: string;
  params: Record<string, number>;
};

export type Clip = {
  id: string;
  start: number;
  duration: number;
  type?: 'image' | 'video' | 'text' | 'shape';
  transform: {
    x: Keyframe[];
    y: Keyframe[];
    scale: Keyframe[];
    rotation: Keyframe[];
    opacity: Keyframe[];
  };
  effects: EffectInstance[];
  // Media-specific properties
  mediaUrl?: string;
  mediaType?: string;
  // Text-specific properties
  content?: string;
  font?: string;
  fontSize?: number;
  color?: string;
  // Shape-specific properties
  shapeType?: 'rectangle' | 'circle' | 'triangle';
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

export type Track = {
  id: string;
  clips: Clip[];
};

export type EditorState = {
  time: number;
  fps: number;
  resolution: [number, number];
  tracks: Track[];
  playing: boolean;
  selectedClipId: string | null;
  duration: number;
};

export type EditorStore = EditorState & {
  setTime: (time: number) => void;
  setPlaying: (playing: boolean) => void;
  setFps: (fps: number) => void;
  setResolution: (resolution: [number, number]) => void;
  addClip: (clip: Clip) => void;
  updateClip: (id: string, updates: Partial<Clip>) => void;
  deleteClip: (id: string) => void;
  selectClip: (id: string | null) => void;
  setDuration: (duration: number) => void;
  loadProject: (clips: Clip[], duration: number, fps?: number, resolution?: [number, number]) => void;
  reset: () => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  time: 0,
  fps: 30,
  resolution: [1920, 1080],
  tracks: [],
  playing: false,
  selectedClipId: null,
  duration: 30,
  
  setTime: (time: number) => set({ time }),
  
  setPlaying: (playing: boolean) => set({ playing }),
  
  setFps: (fps: number) => set({ fps }),
  
  setResolution: (resolution: [number, number]) => set({ resolution }),
  
  addClip: (clip: Clip) => set((state) => {
    // If no tracks exist, create default track
    if (state.tracks.length === 0) {
      return {
        tracks: [{ id: 'track-1', clips: [clip] }],
        selectedClipId: clip.id
      };
    }
    
    // Add to first track
    const updatedTracks = [...state.tracks];
    updatedTracks[0] = {
      ...updatedTracks[0],
      clips: [...updatedTracks[0].clips, clip]
    };
    
    return {
      tracks: updatedTracks,
      selectedClipId: clip.id
    };
  }),
  
  updateClip: (id: string, updates: Partial<Clip>) => set((state) => ({
    tracks: state.tracks.map(track => ({
      ...track,
      clips: track.clips.map(clip => 
        clip.id === id ? { ...clip, ...updates } : clip
      )
    }))
  })),
  
  deleteClip: (id: string) => set((state) => ({
    tracks: state.tracks.map(track => ({
      ...track,
      clips: track.clips.filter(clip => clip.id !== id)
    })),
    selectedClipId: state.selectedClipId === id ? null : state.selectedClipId
  })),
  
  selectClip: (id: string | null) => set({ selectedClipId: id }),
  
  setDuration: (duration: number) => set({ duration }),
  
  loadProject: (clips: Clip[], duration: number, fps = 30, resolution: [number, number] = [1920, 1080]) => set({ 
    tracks: clips.length > 0 ? [{ id: 'track-1', clips }] : [],
    duration,
    fps,
    resolution,
    time: 0,
    playing: false,
    selectedClipId: null
  }),
  
  reset: () => set({
    time: 0,
    fps: 30,
    resolution: [1920, 1080],
    tracks: [],
    playing: false,
    selectedClipId: null,
    duration: 30
  })
}));
