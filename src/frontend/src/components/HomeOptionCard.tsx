import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface HomeOptionCardProps {
  name: string;
  route: string;
}

export function HomeOptionCard({ name, route }: HomeOptionCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => navigate({ to: route })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer rounded-2xl bg-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300"
      style={{ 
        transformStyle: "preserve-3d",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.2), 0 10px 40px rgba(0, 0, 0, 0.5)",
        transform: isHovered 
          ? "translateY(-10px) rotateX(6deg) rotateY(-6deg)" 
          : "translateY(0) rotateX(0) rotateY(0)",
      }}
    >
      {/* Neon edge glow */}
      <div 
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
          boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.3)",
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
    </div>
  );
}
