import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Plus, Video } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { BRollGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function BRollGenerate() {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState([30]);
  const [style, setStyle] = useState("cinematic");
  const [resolution, setResolution] = useState("1080p");
  const [transition, setTransition] = useState("fade");
  const [result, setResult] = useState<string | null>(null);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!description) {
      toast.error("Please enter a scene description");
      return;
    }

    const payload: BRollGeneratePayload = {
      description,
      duration: duration[0],
      style,
      resolution,
    };

    submitAIJob.mutate({ jobType: "broll.generate", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Video className="w-8 h-8 text-purple-400" />
            B-Roll Generator
          </h1>
          <p className="text-white/60">Generate cinematic B-roll footage with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Scene Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the B-roll scenes you want... (e.g., 'aerial shots of a city at sunset, slow motion people walking')"
              className="min-h-32 bg-white/5 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Duration: {duration[0]}s</Label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={5}
                max={60}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="vlog">Vlog</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Resolution</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="4K">4K</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transition Type</Label>
              <Select value={transition} onValueChange={setTransition}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cut">Cut</SelectItem>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="dissolve">Dissolve</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !description}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating B-Roll...
              </>
            ) : (
              "Generate B-Roll"
            )}
          </Button>
        </div>

        {result && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated B-Roll</h3>
            <video controls className="w-full rounded-lg">
              <source src={result} />
            </video>
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
