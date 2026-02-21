import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Plus } from "lucide-react";
import { useAIJob } from "@/hooks/useAIJob";
import type { LogoGeneratePayload } from "@/types/aiJob";
import { toast } from "sonner";

export default function LogoGenerate() {
  const [brandName, setBrandName] = useState("");
  const [style, setStyle] = useState("modern");
  const [colors, setColors] = useState<string[]>(["#000000", "#FFFFFF"]);
  const [iconPreferences, setIconPreferences] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const { submitAIJob } = useAIJob();

  const handleSubmit = () => {
    if (!brandName) {
      toast.error("Please enter a brand name");
      return;
    }

    const payload: LogoGeneratePayload = {
      brandName,
      style,
      colors,
      iconPreferences,
    };

    submitAIJob.mutate({ jobType: "logo.generate", payload });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Logo Generator</h1>
          <p className="text-white/60">Create professional brand logos with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label>Brand Name</Label>
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name..."
              className="bg-white/5 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label>Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="vintage">Vintage</SelectItem>
                <SelectItem value="playful">Playful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Icon Preferences (Optional)</Label>
            <Input
              value={iconPreferences}
              onChange={(e) => setIconPreferences(e.target.value)}
              placeholder="e.g., mountain, tech, abstract..."
              className="bg-white/5 border-white/20"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitAIJob.isPending || !brandName}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {submitAIJob.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Logos...
              </>
            ) : (
              "Generate Logos"
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold">Generated Logos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((logo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-white rounded-lg flex items-center justify-center p-4">
                    <img src={logo} alt={`Logo ${index + 1}`} className="max-w-full max-h-full" />
                  </div>
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
