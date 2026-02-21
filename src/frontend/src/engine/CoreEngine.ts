import { interpolate } from './KeyframeEngine';
import { Clip, EditorState } from '../store/editorStore';
import { EffectEngine } from './EffectEngine';

export class CoreEngine {
  renderClip(clip: Clip, time: number) {
    const localTime = time - clip.start;
    
    return {
      x: interpolate(clip.transform.x, localTime),
      y: interpolate(clip.transform.y, localTime),
      scale: interpolate(clip.transform.scale, localTime),
      rotation: interpolate(clip.transform.rotation, localTime),
      opacity: interpolate(clip.transform.opacity, localTime) || 1
    };
  }

  renderFrame(state: EditorState, time: number): void {
    // This method orchestrates the complete frame rendering pipeline
    // It connects Timeline, Keyframe, and Effect engines
    
    // Note: In a real implementation, this would render to a canvas
    // For now, it serves as the architectural connection point
    console.log(`Rendering frame at time ${time}s with ${state.tracks.length} tracks`);
  }
}
