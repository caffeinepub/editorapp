import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Plus } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { StickerGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function StickerGenerate() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cartoon");
  const [size, setSize] = useState("512x512");
  const [background, setBackground] = useState("transparent");
  const [result, setResult] = useState<string | null>(null);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!prompt) {
      toast.error("Please enter a sticker description");
      return;
    }

    const payload: StickerGeneratePayload = {
      prompt,
      style,
      size,
      background,
    };

    submitAIJob.mutate({ jobType: "sticker.generate", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sticker Generator</h1>
          <p className="text-white/60">Create custom stickers with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Sticker Description</Label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your sticker... (e.g., 'cute cat with sunglasses')"
              className="bg-white/5 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="pixel">Pixel Art</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="256x256">256×256</SelectItem>
                  <SelectItem value="512x512">512×512</SelectItem>
                  <SelectItem value="1024x1024">1024×1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Background</Label>
              <Select value={background} onValueChange={setBackground}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transparent">Transparent</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !prompt}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Sticker...
              </>
            ) : (
              "Generate Sticker"
            )}
          </Button>
        </div>

        {result && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Sticker</h3>
            <div className="flex justify-center">
              <img src={result} alt="Generated sticker" className="max-w-xs rounded-lg" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Add to Assets
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
