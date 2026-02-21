import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Download, Plus, User } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { CharacterGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function CharacterGenerate() {
  const [description, setDescription] = useState("");
  const [consistency, setConsistency] = useState(true);
  const [style, setStyle] = useState("realistic");
  const [poses, setPoses] = useState<string[]>(["front", "side"]);
  const [results, setResults] = useState<string[]>([]);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!description) {
      toast.error("Please enter a character description");
      return;
    }

    const payload: CharacterGeneratePayload = {
      description,
      consistency,
      poses,
      style,
    };

    submitAIJob.mutate({ jobType: "character.generate", payload });
  };

  const togglePose = (pose: string) => {
    setPoses((prev) =>
      prev.includes(pose) ? prev.filter((p) => p !== pose) : [...prev, pose]
    );
  };

  const availablePoses = ["front", "side", "back", "three-quarter", "action"];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <User className="w-8 h-8 text-purple-400" />
            Character Generator
          </h1>
          <p className="text-white/60">Generate consistent character designs with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Character Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your character... (e.g., 'a young warrior with blue armor and silver hair')"
              className="min-h-32 bg-white/5 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Consistency Mode</Label>
                <p className="text-xs text-white/60">Maintain character features across poses</p>
              </div>
              <Switch checked={consistency} onCheckedChange={setConsistency} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Poses to Generate</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availablePoses.map((pose) => (
                <div key={pose} className="flex items-center space-x-2">
                  <Checkbox
                    id={pose}
                    checked={poses.includes(pose)}
                    onCheckedChange={() => togglePose(pose)}
                  />
                  <Label htmlFor={pose} className="capitalize cursor-pointer">
                    {pose}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !description || poses.length === 0}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Character...
              </>
            ) : (
              "Generate Character"
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Character</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt={`Pose ${index + 1}`} className="w-full rounded-lg" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
