// AI Knowledge Base for context-aware help responses

export interface AITool {
  name: string;
  description: string;
  useCases: string[];
  exampleParams?: Record<string, any>;
}

export interface EditorFeature {
  name: string;
  description: string;
}

export interface Workflow {
  name: string;
  steps: string[];
}

export interface KnowledgeBase {
  tools: Record<string, AITool>;
  editor: Record<string, EditorFeature>;
  workflows: Record<string, Workflow>;
  troubleshooting: Record<string, string>;
}

export const aiKnowledgeBase: KnowledgeBase = {
  tools: {
    imageGenerator: {
      name: "Image Generator",
      description: "Generate custom images from text prompts using AI",
      useCases: [
        "Create thumbnails for videos",
        "Generate backgrounds and overlays",
        "Design stickers and graphics",
        "Create poster art",
      ],
      exampleParams: {
        prompt: "cinematic neon background",
        size: "1024x1024",
        style: "photorealistic",
      },
    },
    videoGenerator: {
      name: "Video Generator",
      description: "Create AI-generated video clips from text descriptions",
      useCases: [
        "Generate short clips and B-roll",
        "Create animated backgrounds",
        "Produce motion graphics",
        "Generate stock footage",
      ],
      exampleParams: {
        prompt: "cinematic slow motion city night",
        duration: 5,
        aspectRatio: "9:16",
      },
    },
    autoCut: {
      name: "Auto Cut",
      description: "Automatically trim and cut videos using AI detection",
      useCases: [
        "Remove silence from recordings",
        "Detect and remove bad frames",
        "Identify highlights automatically",
        "Apply smart jump cuts",
      ],
      exampleParams: {
        videoUrl: "input.mp4",
        style: "reel",
        removeSilence: true,
      },
    },
    autoSubtitle: {
      name: "Auto Subtitles",
      description: "Generate accurate captions with word-level timestamps",
      useCases: [
        "Add captions to videos",
        "Create multilingual subtitles",
        "Generate animated text overlays",
        "Add emoji highlights",
      ],
      exampleParams: {
        videoUrl: "input.mp4",
        language: "en",
        style: "modern",
      },
    },
    autoEnhance: {
      name: "Auto Enhance",
      description: "Improve video and audio quality automatically",
      useCases: [
        "Auto color correction",
        "Enhance exposure and white balance",
        "Remove background noise",
        "Boost voice clarity",
        "Normalize audio levels",
      ],
      exampleParams: {
        videoUrl: "input.mp4",
        video: true,
        audio: true,
      },
    },
    autoUpscale: {
      name: "Auto Upscale",
      description: "Increase resolution using AI super resolution",
      useCases: [
        "Upscale 720p to 1080p",
        "Upscale 1080p to 4K",
        "Enhance image quality",
        "Preserve facial details",
        "Reduce compression artifacts",
      ],
      exampleParams: {
        mediaUrl: "clip.mp4",
        target: "4k",
      },
    },
    chatAssistant: {
      name: "AI Chat Assistant",
      description: "Get help with editing tasks and learn features",
      useCases: [
        "Learn how to use tools",
        "Get step-by-step guidance",
        "Troubleshoot issues",
        "Discover features",
      ],
      exampleParams: {
        message: "How do I add subtitles?",
        context: "video-editor",
      },
    },
  },
  editor: {
    timeline: {
      name: "Timeline",
      description: "Used to arrange clips and layers in sequence. Supports multiple tracks for organizing video, audio, and text layers.",
    },
    effects: {
      name: "Effects",
      description: "Apply visual and audio changes to clips. Includes filters, color correction, transitions, and audio effects.",
    },
    clips: {
      name: "Clips",
      description: "Media segments on the timeline. Can be video, audio, images, or text. Each clip has properties like position, scale, and opacity.",
    },
    tracks: {
      name: "Tracks",
      description: "Layers for organizing clips. Higher tracks appear on top. Use tracks to separate video, audio, effects, and text.",
    },
    keyframes: {
      name: "Keyframes",
      description: "Animation control points. Set keyframes to animate properties like position, scale, rotation, and opacity over time.",
    },
    inspector: {
      name: "Inspector",
      description: "Property editor for selected clips. Adjust transform, effects, and timing properties.",
    },
    toolbar: {
      name: "Toolbar",
      description: "Main controls for playback, media upload, text creation, and project settings.",
    },
  },
  workflows: {
    addMedia: {
      name: "Adding Media to Timeline",
      steps: [
        "Click the Upload button in the toolbar",
        "Select your video, image, or audio file",
        "The media will appear in your assets",
        "Drag the media from assets to the timeline",
        "Position and resize as needed",
      ],
    },
    createAnimation: {
      name: "Creating Keyframe Animations",
      steps: [
        "Select a clip on the timeline",
        "Open the Inspector panel",
        "Move the playhead to the start position",
        "Click the keyframe button next to a property",
        "Move the playhead to the end position",
        "Change the property value",
        "A new keyframe is automatically created",
        "Play to preview the animation",
      ],
    },
    applyEffects: {
      name: "Applying Effects",
      steps: [
        "Select a clip on the timeline",
        "Open the Inspector panel",
        "Scroll to the Effects section",
        "Click Add Effect",
        "Choose an effect from the list",
        "Adjust effect parameters",
        "Effects are applied in real-time",
      ],
    },
    generateSubtitles: {
      name: "Generating Subtitles",
      steps: [
        "Go to AI Tools → Auto Subtitles",
        "Upload your video",
        "Choose language and style",
        "Select font and position",
        "Enable emoji if desired",
        "Click Generate",
        "Review and edit subtitles",
        "Apply to timeline",
      ],
    },
    autoCutVideo: {
      name: "Auto-Cutting Videos",
      steps: [
        "Go to AI Tools → Auto Cut",
        "Upload your video",
        "Select a cutting style",
        "Enable Remove Silence if needed",
        "Click Process",
        "Review the cuts in the preview",
        "Apply to timeline or export",
      ],
    },
    exportProject: {
      name: "Exporting Projects",
      steps: [
        "Click the Export button in the toolbar",
        "Choose your format (MP4, MOV, WebM)",
        "Select resolution and quality",
        "Choose frame rate",
        "Click Export",
        "Wait for processing",
        "Download will start automatically",
      ],
    },
  },
  troubleshooting: {
    playbackLag: "If playback is lagging, try reducing preview quality in settings, closing other applications, or rendering a preview of complex sections.",
    exportFailed: "If export fails, check that all media files are available, reduce export quality, or try a different format. Ensure you have enough disk space.",
    missingAssets: "If assets are missing, check that files haven't been moved or deleted. Re-import media if needed. Save projects regularly to avoid data loss.",
    audioSync: "If audio is out of sync, check that your video and audio have matching frame rates. Use the audio offset control in the inspector to adjust timing.",
    slowRendering: "If rendering is slow, reduce resolution, disable unnecessary effects, or render in sections. Close background applications to free up resources.",
  },
};
