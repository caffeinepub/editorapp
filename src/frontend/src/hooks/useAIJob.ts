import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { AIJobType, AIJobPayload } from "../types/aiJob";
import { JobStatus } from "../backend";
import { toast } from "sonner";

export function useAIJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  // Submit AI job mutation
  const submitAIJob = useMutation({
    mutationFn: async ({
      jobType,
      payload,
      deviceId,
      qualityPreset = "high",
    }: {
      jobType: AIJobType;
      payload: AIJobPayload;
      deviceId?: string;
      qualityPreset?: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");

      const payloadString = JSON.stringify(payload);
      const jobId = await actor.submitJob(jobType, payloadString, deviceId || null, qualityPreset);

      return { jobId, jobType, payload };
    },
    onSuccess: ({ jobId, jobType, payload }) => {
      // Start polling for job status
      queryClient.invalidateQueries({ queryKey: ["aiJobs"] });

      // Show category-specific notification
      const category = getJobCategory(jobType);
      const action = getCategoryAction(category);

      toast.success(`${getJobLabel(jobType)} started`, {
        description: `Job ID: ${jobId.toString()}`,
        action: {
          label: action.label,
          onClick: action.onClick,
        },
      });

      // Start status polling
      pollJobStatus(jobId, jobType, payload);
    },
    onError: (error) => {
      toast.error("Failed to submit job", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });

  // Poll job status until completion
  const pollJobStatus = async (jobId: bigint, jobType: AIJobType, payload: AIJobPayload) => {
    if (!actor) return;

    const pollInterval = setInterval(async () => {
      try {
        const status = await actor.getJobStatus(jobId);

        if (status === JobStatus.completed) {
          clearInterval(pollInterval);

          // Retrieve results
          const results = await actor.getJobResults(jobId);
          if (results) {
            handleJobCompletion(jobId, jobType, payload, results);
          }

          queryClient.invalidateQueries({ queryKey: ["aiJobs"] });
        } else if (status === JobStatus.failed) {
          clearInterval(pollInterval);

          toast.error(`${getJobLabel(jobType)} failed`, {
            description: "Please try again or contact support",
          });

          queryClient.invalidateQueries({ queryKey: ["aiJobs"] });
        }
      } catch (error) {
        clearInterval(pollInterval);
        console.error("Error polling job status:", error);
      }
    }, 2000); // Poll every 2 seconds

    // Cleanup after 5 minutes
    setTimeout(() => clearInterval(pollInterval), 300000);
  };

  // Handle job completion based on category
  const handleJobCompletion = (
    jobId: bigint,
    jobType: AIJobType,
    payload: AIJobPayload,
    results: string
  ) => {
    const category = getJobCategory(jobType);

    try {
      const parsedResults = JSON.parse(results);

      // Generation AI: Add to asset library
      if (
        category === "generation" &&
        (jobType === "image.generate" ||
          jobType === "video.generate" ||
          jobType === "voice.clone" ||
          jobType === "music.generate" ||
          jobType === "broll.generate" ||
          jobType === "logo.generate" ||
          jobType === "sticker.generate" ||
          jobType === "character.generate")
      ) {
        toast.success(`${getJobLabel(jobType)} completed!`, {
          description: "Results added to your asset library",
          action: {
            label: "View in Assets",
            onClick: () => {
              // Navigate to assets or open assets panel
              console.log("Navigate to assets");
            },
          },
        });
      }

      // Editing/Creator AI: Integrate into timeline
      else if (
        category === "editing" ||
        category === "creator" ||
        jobType === "subtitle.animate" ||
        jobType === "object.track" ||
        jobType === "face.track"
      ) {
        toast.success(`${getJobLabel(jobType)} completed!`, {
          description: "Changes applied to timeline",
          action: {
            label: "View on Timeline",
            onClick: () => {
              // Navigate to timeline or highlight changes
              console.log("Navigate to timeline");
            },
          },
        });
      }

      // Enhancement AI: Replace original
      else if (category === "enhancement") {
        toast.success(`${getJobLabel(jobType)} completed!`, {
          description: "Enhanced version ready",
          action: {
            label: "Apply Changes",
            onClick: () => {
              // Replace original with enhanced version
              console.log("Apply enhanced version");
            },
          },
        });
      }

      // Growth AI: Show results
      else if (category === "growth") {
        toast.success(`${getJobLabel(jobType)} completed!`, {
          description: "View your generated content",
          action: {
            label: "View Results",
            onClick: () => {
              // Show results modal or panel
              console.log("Show results");
            },
          },
        });
      }

      // Experimental AI: Download or apply
      else if (category === "experimental") {
        toast.success(`${getJobLabel(jobType)} completed!`, {
          description: "Experimental feature applied",
          action: {
            label: "Download",
            onClick: () => {
              // Download result
              console.log("Download result");
            },
          },
        });
      }

      // Default: Generic success
      else {
        toast.success(`${getJobLabel(jobType)} completed!`, {
          description: "Job finished successfully",
        });
      }
    } catch (error) {
      toast.success(`${getJobLabel(jobType)} completed!`, {
        description: "Job finished successfully",
      });
    }
  };

  // Get all queued jobs
  const { data: queuedJobs = [], isLoading: isLoadingJobs } = useQuery({
    queryKey: ["aiJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQueuedJobs();
    },
    enabled: !!actor,
    refetchInterval: 2000, // Refresh every 2 seconds
  });

  return {
    submitAIJob,
    queuedJobs,
    isLoadingJobs,
  };
}

// Helper functions
function getJobCategory(jobType: AIJobType): string {
  if (
    [
      "image.generate",
      "video.generate",
      "voice.clone",
      "music.generate",
      "broll.generate",
      "logo.generate",
      "sticker.generate",
      "character.generate",
    ].includes(jobType)
  ) {
    return "generation";
  }

  if (
    [
      "auto.cut",
      "highlight.detect",
      "timeline.suggest",
      "motion.autoKeyframe",
      "motion.autoEasing",
      "camera.shake",
      "parallax.create",
    ].includes(jobType)
  ) {
    return "editing";
  }

  if (
    [
      "enhance",
      "upscale",
      "hdr.enhance",
      "skin.correct",
      "flicker.remove",
      "face.restore",
      "video.restore",
    ].includes(jobType)
  ) {
    return "enhancement";
  }

  if (
    [
      "auto.subtitle",
      "subtitle.animate",
      "emoji.insert",
      "template.apply",
      "brand.apply",
      "object.track",
      "face.track",
      "effect.glow",
      "effect.blur",
      "greenscreen.remove",
    ].includes(jobType)
  ) {
    return "creator";
  }

  if (
    [
      "chat.help",
      "command.cinematic",
      "command.fixColorAudio",
      "command.viralReel",
      "help.stepByStep",
      "help.explain",
    ].includes(jobType)
  ) {
    return "assistant";
  }

  if (
    [
      "title.generate",
      "hook.generate",
      "caption.generate",
      "hashtag.generate",
      "virality.predict",
      "postTime.suggest",
      "abTest.create",
    ].includes(jobType)
  ) {
    return "growth";
  }

  if (
    [
      "actor.replace",
      "avatar.create",
      "eyeContact.correct",
      "gesture.add",
      "script.toVideo",
      "camera.frame",
      "text.toShortVideo",
    ].includes(jobType)
  ) {
    return "experimental";
  }

  return "other";
}

function getJobLabel(jobType: AIJobType): string {
  const labels: Record<AIJobType, string> = {
    "image.generate": "Image Generation",
    "video.generate": "Video Generation",
    "auto.cut": "Auto Cut",
    "auto.subtitle": "Auto Subtitles",
    enhance: "Auto Enhance",
    upscale: "Auto Upscale",
    "chat.help": "AI Assistant",
    "voice.clone": "Voice Clone",
    "music.generate": "Music Generation",
    "broll.generate": "B-Roll Generation",
    "logo.generate": "Logo Generation",
    "sticker.generate": "Sticker Generation",
    "character.generate": "Character Generation",
    "highlight.detect": "Highlight Detection",
    "timeline.suggest": "Timeline Intelligence",
    "motion.autoKeyframe": "Motion AI",
    "motion.autoEasing": "Motion Easing",
    "camera.shake": "Camera Shake",
    "parallax.create": "Parallax Effect",
    "hdr.enhance": "HDR Enhancement",
    "skin.correct": "Skin Correction",
    "flicker.remove": "Flicker Removal",
    "face.restore": "Face Restoration",
    "video.restore": "Video Restoration",
    "subtitle.animate": "Subtitle Animation",
    "emoji.insert": "Emoji Insertion",
    "template.apply": "Template Application",
    "brand.apply": "Brand Kit",
    "object.track": "Object Tracking",
    "face.track": "Face Tracking",
    "effect.glow": "Glow Effect",
    "effect.blur": "Blur Effect",
    "greenscreen.remove": "Green Screen Removal",
    "command.cinematic": "Cinematic Mode",
    "command.fixColorAudio": "Fix Color & Audio",
    "command.viralReel": "Viral Reel",
    "help.stepByStep": "Step-by-Step Guide",
    "help.explain": "Concept Explanation",
    "title.generate": "Title Generation",
    "hook.generate": "Hook Generation",
    "caption.generate": "Caption Generation",
    "hashtag.generate": "Hashtag Generation",
    "virality.predict": "Virality Prediction",
    "postTime.suggest": "Post Time Optimization",
    "abTest.create": "A/B Test Creation",
    "actor.replace": "Actor Replacement",
    "avatar.create": "AI Avatar",
    "eyeContact.correct": "Eye Contact Correction",
    "gesture.add": "Gesture Addition",
    "script.toVideo": "Script to Video",
    "camera.frame": "Camera Framing",
    "text.toShortVideo": "Text to Short Video",
  };

  return labels[jobType] || jobType;
}

function getCategoryAction(category: string): { label: string; onClick: () => void } {
  const actions: Record<string, { label: string; onClick: () => void }> = {
    generation: {
      label: "View in Assets",
      onClick: () => console.log("Navigate to assets"),
    },
    editing: {
      label: "View on Timeline",
      onClick: () => console.log("Navigate to timeline"),
    },
    enhancement: {
      label: "Apply Changes",
      onClick: () => console.log("Apply changes"),
    },
    creator: {
      label: "View on Timeline",
      onClick: () => console.log("Navigate to timeline"),
    },
    assistant: {
      label: "View Results",
      onClick: () => console.log("Show results"),
    },
    growth: {
      label: "View Results",
      onClick: () => console.log("Show results"),
    },
    experimental: {
      label: "Download",
      onClick: () => console.log("Download result"),
    },
  };

  return (
    actions[category] || {
      label: "View",
      onClick: () => console.log("View result"),
    }
  );
}
