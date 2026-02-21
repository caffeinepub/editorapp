import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ThreeBackground } from "../../components/ThreeBackground";
import { NavbarDesktop } from "../../components/NavbarDesktop";
import { MobileBottomNav } from "../../components/MobileBottomNav";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Image, Download, Plus, Loader2 } from "lucide-react";
import { useAIJob } from "../../hooks/useAIJob";
import type { ImageGeneratePayload } from "../../types/aiJob";

export default function ImageGenerator() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [style, setStyle] = useState("photorealistic");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const { submitAIJob } = useAIJob();

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    const payload: ImageGeneratePayload = {
      prompt,
      size,
      style,
    };

    submitAIJob.mutate({
      jobType: "image.generate",
      payload,
    });
  };

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
                <Image className="w-8 h-8 text-teal-400" />
                AI Image Generator
              </h1>
              <p className="text-white/60 mt-1">Generate custom images from text prompts</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-white mb-2 block">
                  Describe your image
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the image you want to create... (e.g., 'cinematic neon cityscape at night with rain')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-black/50 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">Image Size</Label>
                <RadioGroup value={size} onValueChange={setSize}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1024x1024" id="size-1024" />
                    <Label htmlFor="size-1024" className="text-white/80 cursor-pointer">
                      1024×1024 (Square)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="512x512" id="size-512" />
                    <Label htmlFor="size-512" className="text-white/80 cursor-pointer">
                      512×512 (Small)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="256x256" id="size-256" />
                    <Label htmlFor="size-256" className="text-white/80 cursor-pointer">
                      256×256 (Thumbnail)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="style" className="text-white mb-2 block">
                  Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-black/50 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photorealistic">Photorealistic</SelectItem>
                    <SelectItem value="cinematic">Cinematic</SelectItem>
                    <SelectItem value="illustration">Illustration</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || submitAIJob.isPending}
                className="w-full bg-gradient-to-r from-teal-500 to-primary hover:from-teal-600 hover:to-primary/90"
              >
                {submitAIJob.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Image className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>

            {/* Results Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-white">Generated Images</h2>
              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-white/40">
                  <Image className="w-16 h-16 mb-4" />
                  <p>No images generated yet</p>
                  <p className="text-sm mt-2">Enter a prompt and click Generate</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border border-white/10"
                    >
                      <img
                        src={imageUrl}
                        alt={`Generated ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = imageUrl;
                            link.download = `ai-generated-${index + 1}.png`;
                            link.click();
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Plus className="w-4 h-4" />
                        </Button>
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
