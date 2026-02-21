import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src: string;
  width?: number;
  height?: number;
  onTimeUpdate?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
}

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src, width, height, onTimeUpdate, onPlay, onPause }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
      },
      pause: () => {
        videoRef.current?.pause();
      },
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime: () => {
        return videoRef.current?.currentTime || 0;
      }
    }));

    const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;
      
      if (video.paused) {
        video.play();
        setPlaying(true);
        onPlay?.();
      } else {
        video.pause();
        setPlaying(false);
        onPause?.();
      }
    };

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        onTimeUpdate?.(video.currentTime);
      };

      const handlePlay = () => {
        setPlaying(true);
        onPlay?.();
      };

      const handlePause = () => {
        setPlaying(false);
        onPause?.();
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }, [onTimeUpdate, onPlay, onPause]);

    return (
      <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          className="w-full h-full rounded-xl bg-black object-contain"
        />
        <Button
          onClick={togglePlay}
          size="icon"
          className="absolute bottom-4 left-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 shadow-lg"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
