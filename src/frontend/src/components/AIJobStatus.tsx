import { useState } from "react";
import { useAIJob } from "../hooks/useAIJob";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Sparkles,
  Wand2,
  Scissors,
  Zap,
  Palette,
  TrendingUp,
  FlaskConical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { JobStatus } from "../backend";
import type { AIJobType } from "../types/aiJob";

const JOB_TYPE_MAPPING: Record<
  AIJobType,
  { icon: React.ComponentType<any>; label: string; category: string }
> = {
  "image.generate": { icon: Sparkles, label: "Image Generation", category: "generation" },
  "video.generate": { icon: Sparkles, label: "Video Generation", category: "generation" },
  "voice.clone": { icon: Sparkles, label: "Voice Clone", category: "generation" },
  "music.generate": { icon: Sparkles, label: "Music Generation", category: "generation" },
  "broll.generate": { icon: Sparkles, label: "B-Roll Generation", category: "generation" },
  "logo.generate": { icon: Sparkles, label: "Logo Generation", category: "generation" },
  "sticker.generate": { icon: Sparkles, label: "Sticker Generation", category: "generation" },
  "character.generate": { icon: Sparkles, label: "Character Generation", category: "generation" },
  "auto.cut": { icon: Scissors, label: "Auto Cut", category: "editing" },
  "highlight.detect": { icon: Scissors, label: "Highlight Detection", category: "editing" },
  "timeline.suggest": { icon: Scissors, label: "Timeline Intelligence", category: "editing" },
  "motion.autoKeyframe": { icon: Scissors, label: "Motion AI", category: "editing" },
  "motion.autoEasing": { icon: Scissors, label: "Motion Easing", category: "editing" },
  "camera.shake": { icon: Scissors, label: "Camera Shake", category: "editing" },
  "parallax.create": { icon: Scissors, label: "Parallax Effect", category: "editing" },
  enhance: { icon: Zap, label: "Auto Enhance", category: "enhancement" },
  upscale: { icon: Zap, label: "Auto Upscale", category: "enhancement" },
  "hdr.enhance": { icon: Zap, label: "HDR Enhancement", category: "enhancement" },
  "skin.correct": { icon: Zap, label: "Skin Correction", category: "enhancement" },
  "flicker.remove": { icon: Zap, label: "Flicker Removal", category: "enhancement" },
  "face.restore": { icon: Zap, label: "Face Restoration", category: "enhancement" },
  "video.restore": { icon: Zap, label: "Video Restoration", category: "enhancement" },
  "auto.subtitle": { icon: Palette, label: "Auto Subtitles", category: "creator" },
  "subtitle.animate": { icon: Palette, label: "Subtitle Animation", category: "creator" },
  "emoji.insert": { icon: Palette, label: "Emoji Insertion", category: "creator" },
  "template.apply": { icon: Palette, label: "Template Application", category: "creator" },
  "brand.apply": { icon: Palette, label: "Brand Kit", category: "creator" },
  "object.track": { icon: Palette, label: "Object Tracking", category: "creator" },
  "face.track": { icon: Palette, label: "Face Tracking", category: "creator" },
  "effect.glow": { icon: Palette, label: "Glow Effect", category: "creator" },
  "effect.blur": { icon: Palette, label: "Blur Effect", category: "creator" },
  "greenscreen.remove": { icon: Palette, label: "Green Screen Removal", category: "creator" },
  "chat.help": { icon: Wand2, label: "AI Assistant", category: "assistant" },
  "command.cinematic": { icon: Wand2, label: "Cinematic Mode", category: "assistant" },
  "command.fixColorAudio": { icon: Wand2, label: "Fix Color & Audio", category: "assistant" },
  "command.viralReel": { icon: Wand2, label: "Viral Reel", category: "assistant" },
  "help.stepByStep": { icon: Wand2, label: "Step-by-Step Guide", category: "assistant" },
  "help.explain": { icon: Wand2, label: "Concept Explanation", category: "assistant" },
  "title.generate": { icon: TrendingUp, label: "Title Generation", category: "growth" },
  "hook.generate": { icon: TrendingUp, label: "Hook Generation", category: "growth" },
  "caption.generate": { icon: TrendingUp, label: "Caption Generation", category: "growth" },
  "hashtag.generate": { icon: TrendingUp, label: "Hashtag Generation", category: "growth" },
  "virality.predict": { icon: TrendingUp, label: "Virality Prediction", category: "growth" },
  "postTime.suggest": { icon: TrendingUp, label: "Post Time Optimization", category: "growth" },
  "abTest.create": { icon: TrendingUp, label: "A/B Test Creation", category: "growth" },
  "actor.replace": { icon: FlaskConical, label: "Actor Replacement", category: "experimental" },
  "avatar.create": { icon: FlaskConical, label: "AI Avatar", category: "experimental" },
  "eyeContact.correct": { icon: FlaskConical, label: "Eye Contact Correction", category: "experimental" },
  "gesture.add": { icon: FlaskConical, label: "Gesture Addition", category: "experimental" },
  "script.toVideo": { icon: FlaskConical, label: "Script to Video", category: "experimental" },
  "camera.frame": { icon: FlaskConical, label: "Camera Framing", category: "experimental" },
  "text.toShortVideo": { icon: FlaskConical, label: "Text to Short Video", category: "experimental" },
};

const CATEGORY_COLORS: Record<string, string> = {
  generation: "from-purple-500 to-pink-500",
  editing: "from-blue-500 to-cyan-500",
  enhancement: "from-green-500 to-emerald-500",
  creator: "from-orange-500 to-amber-500",
  assistant: "from-cyan-500 to-teal-500",
  growth: "from-pink-500 to-rose-500",
  experimental: "from-red-500 to-orange-500",
};

export function AIJobStatus() {
  const { queuedJobs, isLoadingJobs } = useAIJob();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  const filteredJobs =
    categoryFilter === "all"
      ? queuedJobs
      : queuedJobs.filter((job) => {
          const mapping = JOB_TYPE_MAPPING[job.jobType as AIJobType];
          return mapping?.category === categoryFilter;
        });

  const toggleExpanded = (jobId: string) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.queued:
        return "bg-blue-500/20 text-blue-500";
      case JobStatus.processing:
        return "bg-yellow-500/20 text-yellow-500";
      case JobStatus.completed:
        return "bg-green-500/20 text-green-500";
      case JobStatus.failed:
        return "bg-red-500/20 text-red-500";
      case JobStatus.cancelled:
        return "bg-gray-500/20 text-gray-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getProgressValue = (status: JobStatus) => {
    switch (status) {
      case JobStatus.queued:
        return 10;
      case JobStatus.processing:
        return 50;
      case JobStatus.completed:
        return 100;
      case JobStatus.failed:
        return 0;
      case JobStatus.cancelled:
        return 0;
      default:
        return 0;
    }
  };

  if (isLoadingJobs) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">AI Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading jobs...</p>
        </CardContent>
      </Card>
    );
  }

  if (queuedJobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">AI Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No active jobs</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">AI Jobs ({filteredJobs.length})</CardTitle>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="generation">Generation</SelectItem>
              <SelectItem value="editing">Editing</SelectItem>
              <SelectItem value="enhancement">Enhancement</SelectItem>
              <SelectItem value="creator">Creator</SelectItem>
              <SelectItem value="assistant">Assistant</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="experimental">Experimental</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {filteredJobs.map((job) => {
              const mapping = JOB_TYPE_MAPPING[job.jobType as AIJobType];
              const Icon = mapping?.icon || Sparkles;
              const category = mapping?.category || "other";
              const isExpanded = expandedJobs.has(job.id.toString());

              return (
                <div
                  key={job.id.toString()}
                  className="p-3 rounded-lg border border-border bg-accent/20 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      <div
                        className={`h-8 w-8 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[category]} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{mapping?.label || job.jobType}</p>
                        <p className="text-xs text-muted-foreground">Job ID: {job.id.toString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(job.status)} variant="secondary">
                        {job.status}
                      </Badge>
                      <button
                        onClick={() => toggleExpanded(job.id.toString())}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Progress
                    value={getProgressValue(job.status)}
                    className={`h-1.5 bg-gradient-to-r ${CATEGORY_COLORS[category]}`}
                  />

                  {isExpanded && (
                    <div className="mt-2 p-2 bg-background/50 rounded text-xs space-y-1">
                      <div>
                        <span className="font-medium">Quality:</span> {job.qualityPreset}
                      </div>
                      <div>
                        <span className="font-medium">Priority:</span> {job.priority.toString()}
                      </div>
                      {job.payload && (
                        <div>
                          <span className="font-medium">Configuration:</span>
                          <pre className="mt-1 p-2 bg-background rounded text-[10px] overflow-x-auto">
                            {JSON.stringify(JSON.parse(job.payload), null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
