import { Clip, EditorState } from '../store/editorStore';
import { CoreEngine } from './CoreEngine';

export async function exportProject(
  state: EditorState,
  format: 'video' | 'gif' | 'images' | 'json',
  onProgress?: (progress: number) => void
): Promise<void> {
  console.log(`Exporting project as ${format}...`);
  console.log(`Resolution: ${state.resolution[0]}x${state.resolution[1]}`);
  console.log(`FPS: ${state.fps}`);
  
  if (format === 'json') {
    // Flatten tracks to clips for backward compatibility
    const clips = state.tracks.flatMap(track => track.clips);
    const projectData = JSON.stringify({ 
      clips, 
      duration: state.duration,
      fps: state.fps,
      resolution: state.resolution
    }, null, 2);
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onProgress?.(100);
    return;
  }
  
  // Frame-by-frame rendering for video/gif/images
  const coreEngine = new CoreEngine();
  const frameTime = 1 / state.fps;
  const totalFrames = Math.ceil(state.duration * state.fps);
  
  console.log(`Rendering ${totalFrames} frames at ${state.fps} fps...`);
  
  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    const t = frameIndex * frameTime;
    
    // Render frame using unified engine
    coreEngine.renderFrame(state, t);
    
    // Update progress
    const progress = ((frameIndex + 1) / totalFrames) * 100;
    onProgress?.(progress);
    
    // Log progress every 10%
    if (frameIndex % Math.ceil(totalFrames / 10) === 0) {
      console.log(`Export progress: ${progress.toFixed(0)}%`);
    }
  }
  
  console.log('Export complete!');
  onProgress?.(100);
}
