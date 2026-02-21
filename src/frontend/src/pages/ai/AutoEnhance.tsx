import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ThreeBackground } from "../../components/ThreeBackground";
import { NavbarDesktop } from "../../components/NavbarDesktop";
import { MobileBottomNav } from "../../components/MobileBottomNav";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { ArrowLeft, Sparkles, Upload, Loader2, Download, Plus } from "lucide-react";
import { useAIJob } from "../../hooks/useAIJob";
import type { EnhancePayload } from "../../types/aiJob";

export default function AutoEnhance() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [enhancedUrl, setEnhancedUrl] = useState("");

  // Video enhancement options
  const [colorCorrection, setColorCorrection] = useState(true);
  const [sharpen, setSharpen] = useState(true);
  const [denoise, setDenoise] = useState(false);

  // Audio enhancement options
  const [noiseRemoval, setNoiseRemoval] = useState(true);
  const [voiceBoost, setVoiceBoost] = useState(true);
  const [normalize, setNormalize] = useState(true);

  const { submitAIJob } = useAIJob();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleEnhance = () => {
    if (!videoUrl) return;

    const payload: EnhancePayload = {
      videoUrl,
      video: colorCorrection || sharpen || denoise,
      audio: noiseRemoval || voiceBoost || normalize,
      videoOptions: {
        colorCorrection,
        sharpen,
        denoise,
      },
      audioOptions: {
        noiseRemoval,
        voiceBoost,
        normalize,
      },
    };

    submitAIJob.mutate({
      jobType: "enhance",
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
                <Sparkles className="w-8 h-8 text-amber-400" />
                Auto Enhance
              </h1>
              <p className="text-white/60 mt-1">Improve video and audio quality automatically</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <Label className="text-white mb-3 block">Upload Media</Label>
                {!videoFile ? (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors">
                    <Upload className="w-12 h-12 text-white/40 mb-2" />
                    <span className="text-white/60 text-sm">Click to upload video or audio</span>
                    <input
                      type="file"
                      accept="video/*,audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 bg-black/50 rounded-lg">
                      <p className="text-white text-sm">{videoFile.name}</p>
                      <p className="text-white/40 text-xs">
                        {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoUrl("");
                        setEnhancedUrl("");
                      }}
                      className="w-full"
                    >
                      Change File
                    </Button>
                  </div>
                )}
              </div>

              {/* Video Enhancement Options */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-lg font-semibold text-white">Video Enhancement</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="color-correction" className="text-white">
                        Auto Color Correction
                      </Label>
                      <p className="text-xs text-white/60">Balance exposure and white balance</p>
                    </div>
                    <Switch
                      id="color-correction"
                      checked={colorCorrection}
                      onCheckedChange={setColorCorrection}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sharpen" className="text-white">
                        Sharpen
                      </Label>
                      <p className="text-xs text-white/60">Enhance detail and clarity</p>
                    </div>
                    <Switch id="sharpen" checked={sharpen} onCheckedChange={setSharpen} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="denoise" className="text-white">
                        Denoise
                      </Label>
                      <p className="text-xs text-white/60">Reduce grain and noise</p>
                    </div>
                    <Switch id="denoise" checked={denoise} onCheckedChange={setDenoise} />
                  </div>
                </div>
              </div>

              {/* Audio Enhancement Options */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-lg font-semibold text-white">Audio Enhancement</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="noise-removal" className="text-white">
                        Noise Removal
                      </Label>
                      <p className="text-xs text-white/60">Remove background noise</p>
                    </div>
                    <Switch
                      id="noise-removal"
                      checked={noiseRemoval}
                      onCheckedChange={setNoiseRemoval}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="voice-boost" className="text-white">
                        Voice Boost
                      </Label>
                      <p className="text-xs text-white/60">Enhance vocal clarity</p>
                    </div>
                    <Switch id="voice-boost" checked={voiceBoost} onCheckedChange={setVoiceBoost} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="normalize" className="text-white">
                        Normalize Loudness
                      </Label>
                      <p className="text-xs text-white/60">Consistent volume levels</p>
                    </div>
                    <Switch id="normalize" checked={normalize} onCheckedChange={setNormalize} />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleEnhance}
                disabled={!videoFile || submitAIJob.isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                {submitAIJob.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enhance Media
                  </>
                )}
              </Button>
            </div>

            {/* Results Panel */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-white">Results</h2>
              {!enhancedUrl ? (
                <div className="flex flex-col items-center justify-center h-96 text-white/40">
                  <Sparkles className="w-16 h-16 mb-4" />
                  <p>No enhancements yet</p>
                  <p className="text-sm mt-2">Upload media and click Enhance</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
                    <p className="text-white/60">Enhanced Preview</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Timeline
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
