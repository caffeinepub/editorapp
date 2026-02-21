import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ThreeBackground } from "../../components/ThreeBackground";
import { NavbarDesktop } from "../../components/NavbarDesktop";
import { MobileBottomNav } from "../../components/MobileBottomNav";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Switch } from "../../components/ui/switch";
import { ArrowLeft, Maximize, Upload, Loader2, Download, Plus } from "lucide-react";
import { useAIJob } from "../../hooks/useAIJob";
import type { UpscalePayload } from "../../types/aiJob";

export default function AutoUpscale() {
  const navigate = useNavigate();
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [upscaledUrl, setUpscaledUrl] = useState("");
  const [target, setTarget] = useState("1080p");
  const [facePreservation, setFacePreservation] = useState(true);
  const [noiseReduction, setNoiseReduction] = useState(true);

  const { submitAIJob } = useAIJob();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaUrl(URL.createObjectURL(file));
    }
  };

  const handleUpscale = () => {
    if (!mediaUrl) return;

    const payload: UpscalePayload = {
      mediaUrl,
      target,
      facePreservation,
      noiseReduction,
    };

    submitAIJob.mutate({
      jobType: "upscale",
      payload,
    });
  };

  const resolutions = [
    { value: "1080p", label: "1080p Full HD", resolution: "1920×1080", size: "~5 MB" },
    { value: "4k", label: "4K Ultra HD", resolution: "3840×2160", size: "~15 MB" },
    { value: "8k", label: "8K", resolution: "7680×4320", size: "~50 MB" },
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
                <Maximize className="w-8 h-8 text-blue-400" />
                Auto Upscale
              </h1>
              <p className="text-white/60 mt-1">Increase resolution using AI super resolution</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <Label className="text-white mb-3 block">Upload Media</Label>
                {!mediaFile ? (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors">
                    <Upload className="w-12 h-12 text-white/40 mb-2" />
                    <span className="text-white/60 text-sm">Click to upload image or video</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 bg-black/50 rounded-lg">
                      <p className="text-white text-sm">{mediaFile.name}</p>
                      <p className="text-white/40 text-xs">
                        {(mediaFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMediaFile(null);
                        setMediaUrl("");
                        setUpscaledUrl("");
                      }}
                      className="w-full"
                    >
                      Change File
                    </Button>
                  </div>
                )}
              </div>

              {/* Target Resolution */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-lg font-semibold text-white">Target Resolution</h3>
                <RadioGroup value={target} onValueChange={setTarget}>
                  {resolutions.map((res) => (
                    <div
                      key={res.value}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <RadioGroupItem value={res.value} id={res.value} />
                      <Label htmlFor={res.value} className="flex-1 cursor-pointer">
                        <div className="text-white font-medium">{res.label}</div>
                        <div className="text-xs text-white/60">
                          {res.resolution} • Est. {res.size}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Enhancement Options */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-lg font-semibold text-white">Enhancement Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="face-preservation" className="text-white">
                        Face Preservation
                      </Label>
                      <p className="text-xs text-white/60">Preserve facial details during upscaling</p>
                    </div>
                    <Switch
                      id="face-preservation"
                      checked={facePreservation}
                      onCheckedChange={setFacePreservation}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="noise-reduction" className="text-white">
                        Noise Reduction
                      </Label>
                      <p className="text-xs text-white/60">Reduce compression artifacts</p>
                    </div>
                    <Switch
                      id="noise-reduction"
                      checked={noiseReduction}
                      onCheckedChange={setNoiseReduction}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleUpscale}
                disabled={!mediaFile || submitAIJob.isPending}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {submitAIJob.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Upscaling...
                  </>
                ) : (
                  <>
                    <Maximize className="w-4 h-4 mr-2" />
                    Upscale Media
                  </>
                )}
              </Button>
            </div>

            {/* Results Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-white">Results</h2>
              {!upscaledUrl ? (
                <div className="flex flex-col items-center justify-center h-96 text-white/40">
                  <Maximize className="w-16 h-16 mb-4" />
                  <p>No upscaled media yet</p>
                  <p className="text-sm mt-2">Upload media and click Upscale</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
                    <p className="text-white/60">Upscaled Preview</p>
                  </div>
                  <div className="p-4 bg-black/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Resolution Increase:</span>
                      <span className="text-white">2x</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">File Size:</span>
                      <span className="text-white">~15 MB</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Replace in Timeline
                    </Button>
                  </div>
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
