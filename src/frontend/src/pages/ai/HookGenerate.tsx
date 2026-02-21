import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Copy } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { HookGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function HookGenerate() {
  const [videoDescription, setVideoDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("general");
  const [hookStyle, setHookStyle] = useState("question");
  const [results, setResults] = useState<any[]>([]);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!videoDescription) {
      toast.error("Please enter a video description");
      return;
    }

    const payload: HookGeneratePayload = {
      videoDescription,
      targetAudience,
      hookStyle,
    };

    submitAIJob.mutate({ jobType: "hook.generate", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hook Generator</h1>
          <p className="text-white/60">Create attention-grabbing video hooks</p>
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
              <Label>Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="young-adults">Young Adults</SelectItem>
                  <SelectItem value="professionals">Professionals</SelectItem>
                  <SelectItem value="creators">Creators</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hook Style</Label>
              <Select value={hookStyle} onValueChange={setHookStyle}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="statement">Statement</SelectItem>
                  <SelectItem value="teaser">Teaser</SelectItem>
                  <SelectItem value="shock">Shock Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !videoDescription}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Hooks...
              </>
            ) : (
              "Generate Hooks"
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Hooks</h3>
            <div className="space-y-3">
              {results.map((hook, index) => (
                <div key={index} className="p-4 bg-black/50 rounded-lg flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{hook.hook}</p>
                    <p className="text-sm text-white/60">
                      Attention Score: {hook.attentionScore}% • {hook.type}
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
