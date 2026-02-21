import { Keyframe } from '../store/editorStore';

export function interpolate(frames: Keyframe[], time: number): number {
  if (frames.length === 0) return 0;
  
  const prev = frames.filter(f => f.time <= time).pop();
  const next = frames.find(f => f.time > time);
  
  if (!prev) return frames[0]?.value ?? 0;
  if (!next) return prev.value;
  
  const t = (time - prev.time) / (next.time - prev.time);
  return prev.value + t * (next.value - prev.value);
}
