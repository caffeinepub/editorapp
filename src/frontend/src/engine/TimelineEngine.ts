import { Track, Clip } from '../store/editorStore';

export class TimelineEngine {
  constructor(private tracks: Track[]) {}

  getActiveClips(time: number): Clip[] {
    const activeClips: Clip[] = [];
    
    for (const track of this.tracks) {
      for (const clip of track.clips) {
        if (time >= clip.start && time <= clip.start + clip.duration) {
          activeClips.push(clip);
        }
      }
    }
    
    return activeClips;
  }
}
