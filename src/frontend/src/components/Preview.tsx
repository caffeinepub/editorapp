import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { useEditorStore } from '../store/editorStore';
import { TimelineEngine } from '../engine/TimelineEngine';
import { CoreEngine } from '../engine/CoreEngine';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { VideoPlayer } from './VideoPlayer';

interface PreviewProps {
  isMobile?: boolean;
}

function ClipRenderer({ clip, time }: { clip: any; time: number }) {
  const coreEngine = useMemo(() => new CoreEngine(), []);
  const transform = coreEngine.renderClip(clip, time);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    if (clip.type === 'video' && clip.mediaUrl) {
      const video = document.createElement('video');
      video.src = clip.mediaUrl;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.play();
      videoRef.current = video;

      const texture = new THREE.VideoTexture(video);
      textureRef.current = texture;

      return () => {
        video.pause();
        video.src = '';
        texture.dispose();
      };
    }
  }, [clip.mediaUrl, clip.type]);

  if (clip.type === 'image' && clip.mediaUrl) {
    return (
      <mesh
        position={[transform.x, transform.y, 0]}
        scale={[transform.scale * 2, transform.scale * 2, 1]}
        rotation={[0, 0, transform.rotation]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={transform.opacity}>
          <primitive attach="map" object={new THREE.TextureLoader().load(clip.mediaUrl)} />
        </meshBasicMaterial>
      </mesh>
    );
  }

  if (clip.type === 'video' && textureRef.current) {
    return (
      <mesh
        position={[transform.x, transform.y, 0]}
        scale={[transform.scale * 2, transform.scale * 2, 1]}
        rotation={[0, 0, transform.rotation]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={textureRef.current} transparent opacity={transform.opacity} />
      </mesh>
    );
  }

  if (clip.type === 'text') {
    return (
      <mesh
        position={[transform.x, transform.y, 0]}
        scale={[transform.scale, transform.scale, 1]}
        rotation={[0, 0, transform.rotation]}
      >
        <planeGeometry args={[2, 0.5]} />
        <meshBasicMaterial color={clip.color || '#ffffff'} transparent opacity={transform.opacity} />
      </mesh>
    );
  }

  if (clip.type === 'shape') {
    let geometry;
    if (clip.shapeType === 'circle') {
      geometry = <circleGeometry args={[0.5, 32]} />;
    } else if (clip.shapeType === 'triangle') {
      geometry = <coneGeometry args={[0.5, 1, 3]} />;
    } else {
      geometry = <boxGeometry args={[1, 1, 0.1]} />;
    }

    return (
      <mesh
        position={[transform.x, transform.y, 0]}
        scale={[transform.scale, transform.scale, 1]}
        rotation={[0, 0, transform.rotation]}
      >
        {geometry}
        <meshBasicMaterial color={clip.fillColor || '#14b8a6'} transparent opacity={transform.opacity} />
      </mesh>
    );
  }

  return null;
}

function Scene() {
  const { time, tracks, playing, setTime } = useEditorStore();
  const timelineEngine = useMemo(() => new TimelineEngine(tracks), [tracks]);
  const activeClips = timelineEngine.getActiveClips(time);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setTime(time + 0.016); // ~60fps
    }, 16);

    return () => clearInterval(interval);
  }, [playing, time, setTime]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={100} />
      <ambientLight intensity={1} />
      {activeClips.map(clip => (
        <ClipRenderer key={clip.id} clip={clip} time={time} />
      ))}
    </>
  );
}

export default function Preview({ isMobile = false }: PreviewProps) {
  const { tracks, time } = useEditorStore();

  // Get first active video clip for mobile HTML5 player
  const activeVideoClip = tracks
    .flatMap(track => track.clips)
    .find(clip => clip.type === 'video' && clip.start <= time && clip.start + clip.duration >= time);

  if (isMobile && activeVideoClip?.mediaUrl) {
    return (
      <div className="w-full h-full max-w-4xl max-h-[600px] rounded-lg overflow-hidden">
        <VideoPlayer src={activeVideoClip.mediaUrl} />
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-4xl max-h-[600px] rounded-lg overflow-hidden border-2 border-teal-500/30 bg-gray-950 shadow-2xl shadow-teal-500/20">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
