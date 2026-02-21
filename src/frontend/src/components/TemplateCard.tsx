import { Play } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface TemplateCardProps {
  id?: string;
  name: string;
  category?: string;
  duration?: number;
  thumbnail?: string;
  gradient?: string;
}

export function TemplateCard({ 
  id,
  name, 
  category,
  duration,
  thumbnail,
  gradient = 'from-purple-600 to-blue-600' 
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // Load template into editor
    navigate({ to: '/editor/video' });
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-48 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl overflow-hidden cursor-pointer transition-all duration-300`}
      style={{
        transform: isHovered ? 'scale(1.05) perspective(1000px) rotateY(8deg)' : 'scale(1) perspective(1000px) rotateY(0deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Thumbnail or Gradient Background */}
      {thumbnail && (
        <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
      )}

      {/* Play Icon Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>

      {/* Use Template Button */}
      {isHovered && (
        <div className="absolute top-4 right-4">
          <button className="px-4 py-2 bg-white/90 text-black rounded-lg font-semibold text-sm hover:bg-white transition-colors">
            Use Template
          </button>
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-3">
        <h3 className="text-white font-semibold">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {category && <span className="text-xs text-white/70">{category}</span>}
          {duration && <span className="text-xs text-white/70">• {duration}s</span>}
        </div>
      </div>
    </div>
  );
}
