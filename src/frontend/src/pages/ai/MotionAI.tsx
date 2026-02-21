import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { MotionAutoKeyframePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function MotionAI() {
  const [clipId, setClipId] = useState("");
  const [property, setProperty] = useState("position");

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!clipId) {
      toast.error("Please select a clip");
      return;
    }

    const payload: MotionAutoKeyframePayload = {
      clipId,
      property,
    };

    submitAIJob.mutate({ jobType: "motion.autoKeyframe", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Motion AI</h1>
          <p className="text-white/60">Auto-generate keyframe animations</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Clip ID</Label>
            <Select value={clipId} onValueChange={setClipId}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue placeholder="Select a clip..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clip1">Clip 1</SelectItem>
                <SelectItem value="clip2">Clip 2</SelectItem>
                <SelectItem value="clip3">Clip 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Property</Label>
            <Select value={property} onValueChange={setProperty}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="position">Position</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="rotation">Rotation</SelectItem>
                <SelectItem value="opacity">Opacity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !clipId}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Keyframes...
              </>
            ) : (
              "Generate Keyframes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
