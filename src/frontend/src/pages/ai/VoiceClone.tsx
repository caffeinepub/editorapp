import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Download, Plus } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { VoiceClonePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function VoiceClone() {
  const [audioFile, setAudioFile] = useState<string>("");
  const [script, setScript] = useState("");
  const [stability, setStability] = useState([0.5]);
  const [similarity, setSimilarity] = useState([0.75]);
  const [style, setStyle] = useState("professional");
  const [result, setResult] = useState<string | null>(null);

  const { submitAIJob } = useAIJob();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAudioFile(reader.result as string);
      reader.readAsDataURL(file);
      toast.success("Audio file uploaded");
    }
  };

  const handleSubmit = () => {
    if (!audioFile || !script) {
      toast.error("Please upload audio and enter script");
      return;
    }

    const payload: VoiceClonePayload = {
      audioUrl: audioFile,
      voiceName: script,
    };

    submitAIJob.mutate({ jobType: "voice.clone", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Voice Clone</h1>
          <p className="text-white/60">Clone any voice and generate speech from text</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Voice Sample Audio</Label>
            <div className="flex gap-2">
              <Input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="flex-1 bg-white/5 border-white/20"
              />
              <Button variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            {audioFile && (
              <audio controls className="w-full mt-2">
                <source src={audioFile} />
              </audio>
            )}
          </div>

          <div className="space-y-2">
            <Label>Script to Generate</Label>
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter the text you want to generate with the cloned voice..."
              className="min-h-32 bg-white/5 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Stability: {stability[0].toFixed(2)}</Label>
              <Slider
                value={stability}
                onValueChange={setStability}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
              <p className="text-xs text-white/60">Higher = more consistent, lower = more expressive</p>
            </div>

            <div className="space-y-2">
              <Label>Similarity: {similarity[0].toFixed(2)}</Label>
              <Slider
                value={similarity}
                onValueChange={setSimilarity}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
              <p className="text-xs text-white/60">How closely to match the original voice</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Voice Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="energetic">Energetic</SelectItem>
                <SelectItem value="calm">Calm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !audioFile || !script}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Cloning Voice...
              </>
            ) : (
              "Clone Voice"
            )}
          </Button>
        </div>

        {result && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Audio</h3>
            <audio controls className="w-full">
              <source src={result} />
            </audio>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button className="flex-1 bg-purple-500 hover:bg-purple-600">
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
