import { useNavigate } from "@tanstack/react-router";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";
import type { AICategory } from "../types/aiJob";

interface AIToolCardProps {
  name: string;
  description: string;
  route: string;
  category: AICategory;
  icon?: React.ReactNode;
}

const categoryColors: Record<AICategory, string> = {
  generation: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  editing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  enhancement: "bg-green-500/20 text-green-400 border-green-500/30",
  creator: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  assistant: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  growth: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  experimental: "bg-red-500/20 text-red-400 border-red-500/30",
};

const categoryGlowColors: Record<AICategory, string> = {
  generation: "hover:shadow-purple-500/50",
  editing: "hover:shadow-blue-500/50",
  enhancement: "hover:shadow-green-500/50",
  creator: "hover:shadow-orange-500/50",
  assistant: "hover:shadow-cyan-500/50",
  growth: "hover:shadow-pink-500/50",
  experimental: "hover:shadow-red-500/50",
};

export function AIToolCard({ name, description, route, category, icon }: AIToolCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate({ to: route })}
      className={`group relative w-full bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/15 ${categoryGlowColors[category]} shadow-lg text-left`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${categoryColors[category]} flex items-center justify-center flex-shrink-0 border`}>
          {icon || <Sparkles className="w-6 h-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">
              {name}
            </h3>
            <Badge variant="outline" className={`text-xs ${categoryColors[category]}`}>
              {category}
            </Badge>
          </div>
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        </div>
      </div>
    </button>
  );
}
