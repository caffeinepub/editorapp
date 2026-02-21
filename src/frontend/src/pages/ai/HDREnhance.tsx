import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Download, Plus } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { HDREnhancePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function HDREnhance() {
  const [mediaFile, setMediaFile] = useState<string>("");
  const [intensity, setIntensity] = useState([50]);
  const [toneMapping, setToneMapping] = useState("aces");
  const [result, setResult] = useState<string | null>(null);

  const { submitAIJob } = useAIJob();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setMediaFile(reader.result as string);
      reader.readAsDataURL(file);
      toast.success("File uploaded");
    }
  };

  const handleSubmit = () => {
    if (!mediaFile) {
      toast.error("Please upload a file");
      return;
    }

    const payload: HDREnhancePayload = {
      mediaUrl: mediaFile,
      intensity: intensity[0],
      toneMapping,
    };

    submitAIJob.mutate({ jobType: "hdr.enhance", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">HDR Enhancement</h1>
          <p className="text-white/60">Enhance dynamic range with HDR processing</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Upload Media</Label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="flex-1 bg-white/5 border border-white/20 rounded p-2"
              />
              <Button variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Intensity: {intensity[0]}%</Label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Tone Mapping</Label>
            <Select value={toneMapping} onValueChange={setToneMapping}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aces">ACES</SelectItem>
                <SelectItem value="reinhard">Reinhard</SelectItem>
                <SelectItem value="filmic">Filmic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !mediaFile}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enhancing...
              </>
            ) : (
              "Enhance HDR"
            )}
          </Button>
        </div>

        {result && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Enhanced Result</h3>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <p className="text-white/60">Preview</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button className="flex-1 bg-green-500 hover:bg-green-600">
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
