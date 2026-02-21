import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { TimelineSuggestPayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function TimelineAI() {
  const [videoUrl, setVideoUrl] = useState("");
  const [suggestType, setSuggestType] = useState<"cuts" | "effects" | "zooms">("cuts");
  const [projectId, setProjectId] = useState("");

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!videoUrl) {
      toast.error("Please enter a video URL");
      return;
    }

    const payload: TimelineSuggestPayload = {
      videoUrl,
      suggestType,
      projectId,
    };

    submitAIJob.mutate({ jobType: "timeline.suggest", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Timeline AI</h1>
          <p className="text-white/60">Get smart timeline suggestions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Video URL</Label>
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter video URL..."
              className="bg-white/5 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label>Suggestion Type</Label>
            <Select value={suggestType} onValueChange={(value: any) => setSuggestType(value)}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cuts">Cuts</SelectItem>
                <SelectItem value="effects">Effects</SelectItem>
                <SelectItem value="zooms">Zooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Project ID (Optional)</Label>
            <Input
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter project ID..."
              className="bg-white/5 border-white/20"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !videoUrl}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Suggestions"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
