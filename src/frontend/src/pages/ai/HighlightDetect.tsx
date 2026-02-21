import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload, Download, Plus } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { HighlightDetectPayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function HighlightDetect() {
  const [videoFile, setVideoFile] = useState<string>("");
  const [criteria, setCriteria] = useState<string[]>(["loudness", "motion"]);
  const [results, setResults] = useState<any[]>([]);

  const { submitAIJob } = useAIJob();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setVideoFile(reader.result as string);
      reader.readAsDataURL(file);
      toast.success("Video uploaded");
    }
  };

  const handleSubmit = () => {
    if (!videoFile) {
      toast.error("Please upload a video");
      return;
    }

    const payload: HighlightDetectPayload = {
      videoUrl: videoFile,
      criteria,
    };

    submitAIJob.mutate({ jobType: "highlight.detect", payload });
  };

  const toggleCriteria = (value: string) => {
    setCriteria((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const availableCriteria = ["loudness", "motion", "faces", "scene-changes"];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Highlight Detection</h1>
          <p className="text-white/60">Find the best moments in your video automatically</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Upload Video</Label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="w-full bg-white/5 border border-white/20 rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <Label>Detection Criteria</Label>
            <div className="grid grid-cols-2 gap-3">
              {availableCriteria.map((criterion) => (
                <div key={criterion} className="flex items-center space-x-2">
                  <Checkbox
                    id={criterion}
                    checked={criteria.includes(criterion)}
                    onCheckedChange={() => toggleCriteria(criterion)}
                  />
                  <Label htmlFor={criterion} className="capitalize cursor-pointer">
                    {criterion.replace("-", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !videoFile || criteria.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Detecting Highlights...
              </>
            ) : (
              "Detect Highlights"
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Detected Highlights</h3>
            <div className="space-y-3">
              {results.map((highlight, index) => (
                <div key={index} className="p-4 bg-black/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Highlight {index + 1}</p>
                      <p className="text-sm text-white/60">
                        {highlight.timestamp}s - {highlight.duration}s
                      </p>
                    </div>
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
          </div>
        )}
      </div>
    </div>
  );
}
