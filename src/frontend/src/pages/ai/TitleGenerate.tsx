import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Copy } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { TitleGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function TitleGenerate() {
  const [videoDescription, setVideoDescription] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [tone, setTone] = useState("engaging");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!videoDescription) {
      toast.error("Please enter a video description");
      return;
    }

    const payload: TitleGeneratePayload = {
      videoDescription,
      platform,
      tone,
      keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
    };

    submitAIJob.mutate({ jobType: "title.generate", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Title Generator</h1>
          <p className="text-white/60">Generate engaging video titles</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Video Description</Label>
            <Textarea
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              placeholder="Describe your video content..."
              className="min-h-32 bg-white/5 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engaging">Engaging</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="clickbait">Clickbait</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Keywords (comma-separated)</Label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., tutorial, beginner, 2024"
              className="bg-white/5 border-white/20"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !videoDescription}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Titles...
              </>
            ) : (
              "Generate Titles"
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Titles</h3>
            <div className="space-y-3">
              {results.map((title, index) => (
                <div key={index} className="p-4 bg-black/50 rounded-lg flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{title.title}</p>
                    <p className="text-sm text-white/60">
                      Engagement: {title.engagement}% • {title.charCount} characters
                    </p>
                  </div>
                  <Button size="sm" variant="secondary">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
