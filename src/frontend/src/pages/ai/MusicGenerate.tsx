import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Plus, Music } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { MusicGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function MusicGenerate() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([60]);
  const [bpm, setBpm] = useState([120]);
  const [genre, setGenre] = useState("electronic");
  const [mood, setMood] = useState("energetic");
  const [result, setResult] = useState<string | null>(null);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!prompt) {
      toast.error("Please enter a music description");
      return;
    }

    const payload: MusicGeneratePayload = {
      prompt,
      duration: duration[0],
      mood,
      genre,
      bpm: bpm[0],
    };

    submitAIJob.mutate({ jobType: "music.generate", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Music className="w-8 h-8 text-purple-400" />
            Music Generator
          </h1>
          <p className="text-white/60">Generate custom music tracks with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Music Description</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the music you want... (e.g., 'upbeat electronic track with synth melodies')"
              className="min-h-32 bg-white/5 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Duration: {duration[0]}s</Label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={15}
                max={180}
                step={15}
              />
            </div>

            <div className="space-y-2">
              <Label>BPM: {bpm[0]}</Label>
              <Slider
                value={bpm}
                onValueChange={setBpm}
                min={60}
                max={180}
                step={5}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Mood</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="uplifting">Uplifting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !prompt}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Music...
              </>
            ) : (
              "Generate Music"
            )}
          </Button>
        </div>

        {result && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Music</h3>
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
                Add to Timeline
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
