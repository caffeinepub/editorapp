import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HomeOptionCard } from "../components/HomeOptionCard";
import { RecentProjects } from "../components/RecentProjects";
import { ThreeBackground } from "../components/ThreeBackground";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { SearchBar } from "../components/SearchBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Sparkles,
  Wand2,
  Scissors,
  Type,
  Zap,
  Palette,
  TrendingUp,
  FlaskConical,
} from "lucide-react";

const AI_CATEGORIES = [
  {
    name: "Generation AI",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    tools: [
      { name: "Image Generator", route: "/ai/image-generator", description: "Generate images from text" },
      { name: "Video Generator", route: "/ai/video-generator", description: "Create AI videos" },
      { name: "Voice Clone", route: "/ai/voice-clone", description: "Clone any voice" },
      { name: "Music Generate", route: "/ai/music-generate", description: "AI music creation" },
      { name: "B-Roll Generate", route: "/ai/broll-generate", description: "Generate B-roll footage" },
      { name: "Logo Generate", route: "/ai/logo-generate", description: "Create brand logos" },
      { name: "Sticker Generate", route: "/ai/sticker-generate", description: "Design custom stickers" },
      { name: "Character Generate", route: "/ai/character-generate", description: "Generate characters" },
    ],
  },
  {
    name: "Editing AI",
    icon: Scissors,
    color: "from-blue-500 to-cyan-500",
    tools: [
      { name: "Highlight Detect", route: "/ai/highlight-detect", description: "Find best moments" },
      { name: "Timeline AI", route: "/ai/timeline-ai", description: "Smart timeline suggestions" },
      { name: "Motion AI", route: "/ai/motion-ai", description: "Auto keyframe animation" },
    ],
  },
  {
    name: "Enhancement AI",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    tools: [
      { name: "Auto Enhance", route: "/ai/auto-enhance", description: "One-click enhancement" },
      { name: "Auto Upscale", route: "/ai/auto-upscale", description: "AI upscaling" },
      { name: "HDR Enhance", route: "/ai/hdr-enhance", description: "HDR enhancement" },
      { name: "Skin Correct", route: "/ai/skin-correct", description: "Skin tone correction" },
      { name: "Flicker Remove", route: "/ai/flicker-remove", description: "Remove flicker" },
      { name: "Face Restore", route: "/ai/face-restore", description: "Restore faces" },
      { name: "Video Restore", route: "/ai/video-restore", description: "Restore old videos" },
    ],
  },
  {
    name: "Creator AI",
    icon: Palette,
    color: "from-orange-500 to-amber-500",
    tools: [
      { name: "Auto Subtitles", route: "/ai/auto-subtitles", description: "Generate captions" },
      { name: "Subtitle Animate", route: "/ai/subtitle-animate", description: "Animate subtitles" },
      { name: "Emoji Insert", route: "/ai/emoji-insert", description: "Smart emoji placement" },
      { name: "Template Apply", route: "/ai/template-apply", description: "Apply templates" },
      { name: "Brand Kit", route: "/ai/brand-kit", description: "Brand consistency" },
      { name: "Object Track", route: "/ai/object-track", description: "Track objects" },
      { name: "Effect Studio", route: "/ai/effect-studio", description: "Create effects" },
      { name: "Green Screen", route: "/ai/green-screen", description: "Remove backgrounds" },
    ],
  },
  {
    name: "Assistant AI",
    icon: Wand2,
    color: "from-cyan-500 to-teal-500",
    tools: [
      { name: "AI Assistant", route: "/ai/assistant", description: "Chat with AI helper" },
      { name: "Help Wizard", route: "/ai/help-wizard", description: "Step-by-step guides" },
    ],
  },
  {
    name: "Growth AI",
    icon: TrendingUp,
    color: "from-pink-500 to-rose-500",
    tools: [
      { name: "Title Generate", route: "/ai/title-generate", description: "Generate titles" },
      { name: "Hook Generate", route: "/ai/hook-generate", description: "Create hooks" },
      { name: "Caption Generate", route: "/ai/caption-generate", description: "Write captions" },
      { name: "Hashtag Generate", route: "/ai/hashtag-generate", description: "Find hashtags" },
      { name: "Virality Predict", route: "/ai/virality-predict", description: "Predict virality" },
      { name: "Post Time", route: "/ai/post-time", description: "Optimal posting time" },
      { name: "A/B Test", route: "/ai/ab-test", description: "Test variations" },
    ],
  },
  {
    name: "Experimental AI",
    icon: FlaskConical,
    color: "from-red-500 to-orange-500",
    tools: [
      { name: "Actor Replace", route: "/ai/actor-replace", description: "Replace actors" },
      { name: "AI Avatar", route: "/ai/avatar-create", description: "Create AI avatars" },
      { name: "Eye Contact", route: "/ai/eye-contact", description: "Fix eye contact" },
      { name: "Gesture Add", route: "/ai/gesture-add", description: "Add gestures" },
      { name: "Script to Video", route: "/ai/script-to-video", description: "Script to video" },
      { name: "Camera Frame", route: "/ai/camera-frame", description: "Auto framing" },
      { name: "Text to Short", route: "/ai/text-to-short", description: "Text to short video" },
      { name: "Coming Soon", route: "/coming-soon", description: "More features" },
    ],
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(AI_CATEGORIES.map((cat) => cat.name))
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThreeBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Video Editor
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Professional video editing powered by 50+ AI tools
          </p>
        </header>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar />
        </div>

        {/* Recent Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Recent Projects</h2>
          <RecentProjects />
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HomeOptionCard name="Create New" route="/editor" />
            <HomeOptionCard name="Templates" route="/templates" />
            <HomeOptionCard name="AI Tools" route="#ai-tools" />
          </div>
        </section>

        {/* AI Tools Categories */}
        <section id="ai-tools" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">AI Tools (50+)</h2>
          <div className="space-y-6">
            {AI_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategories.has(category.name);

              return (
                <div
                  key={category.name}
                  className="bg-background/40 backdrop-blur-xl border border-border rounded-2xl overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center justify-between p-6 hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.tools.length} tools</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-muted-foreground" />
                    )}
                  </button>

                  {/* Category Tools */}
                  {isExpanded && (
                    <div className="p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {category.tools.map((tool) => (
                          <button
                            key={tool.route}
                            onClick={() => navigate({ to: tool.route })}
                            className="p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-left group"
                          >
                            <h4 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                              {tool.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* System AI Note */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">System AI</h3>
            <p className="text-muted-foreground">
              Advanced backend features including AI caching, smart job scheduling, device-aware quality
              optimization, lag prediction, and auto fallback modes are running behind the scenes to ensure
              optimal performance.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-16">
          <p>
            © {new Date().getFullYear()} Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "ai-video-editor"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      <MobileBottomNav />
    </div>
  );
}
