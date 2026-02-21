import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ThreeBackground } from "../../components/ThreeBackground";
import { NavbarDesktop } from "../../components/NavbarDesktop";
import { MobileBottomNav } from "../../components/MobileBottomNav";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import { ArrowLeft, Video, Download, Plus, Loader2, Monitor, Smartphone, Square } from "lucide-react";
import { useAIJob } from "../../hooks/useAIJob";
import type { VideoGeneratePayload } from "../../types/aiJob";

export default function VideoGenerator() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [generatedVideos, setGeneratedVideos] = useState<string[]>([]);

  const { submitAIJob } = useAIJob();

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    const payload: VideoGeneratePayload = {
      prompt,
      duration,
      aspectRatio,
    };

    submitAIJob.mutate({
      jobType: "video.generate",
      payload,
    });
  };

  const aspectRatios = [
    { value: "9:16", label: "Portrait", icon: Smartphone },
    { value: "16:9", label: "Landscape", icon: Monitor },
    { value: "1:1", label: "Square", icon: Square },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ThreeBackground />
      <NavbarDesktop />

      <div className="md:ml-64 relative z-10">
        <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: "/" })}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Video className="w-8 h-8 text-purple-400" />
                AI Video Generator
              </h1>
              <p className="text-white/60 mt-1">Create AI-generated video clips from text</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-white mb-2 block">
                  Describe your video
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the video you want to create... (e.g., 'cinematic slow motion city night with neon lights')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-black/50 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Duration: {duration} seconds
                </Label>
                <Slider
                  value={[duration]}
                  onValueChange={(values) => setDuration(values[0])}
                  min={3}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>3s</span>
                  <span>10s</span>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">Aspect Ratio</Label>
                <div className="grid grid-cols-3 gap-3">
                  {aspectRatios.map((ratio) => {
                    const Icon = ratio.icon;
                    return (
                      <button
                        key={ratio.value}
                        onClick={() => setAspectRatio(ratio.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          aspectRatio === ratio.value
                            ? "border-teal-400 bg-teal-400/20"
                            : "border-white/20 bg-black/50 hover:border-white/40"
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2 text-white" />
                        <div className="text-sm font-medium text-white">{ratio.label}</div>
                        <div className="text-xs text-white/60">{ratio.value}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || submitAIJob.isPending}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {submitAIJob.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Generate Video
                  </>
                )}
              </Button>
            </div>

            {/* Results Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-white">Generated Videos</h2>
              {generatedVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-white/40">
                  <Video className="w-16 h-16 mb-4" />
                  <p>No videos generated yet</p>
                  <p className="text-sm mt-2">Enter a prompt and click Generate</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedVideos.map((videoUrl, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/50"
                    >
                      <div className="aspect-video flex items-center justify-center">
                        <Video className="w-12 h-12 text-white/40" />
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <span className="text-sm text-white">Generated Video {index + 1}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
