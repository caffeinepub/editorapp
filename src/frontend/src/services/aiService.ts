import type {
  AIJob,
  ImageGeneratePayload,
  VideoGeneratePayload,
  AutoCutPayload,
  AutoSubtitlePayload,
  EnhancePayload,
  UpscalePayload,
  ChatHelpPayload,
  VoiceClonePayload,
  MusicGeneratePayload,
  BRollGeneratePayload,
  LogoGeneratePayload,
  StickerGeneratePayload,
  CharacterGeneratePayload,
  HighlightDetectPayload,
  TimelineSuggestPayload,
  MotionAutoKeyframePayload,
  MotionAutoEasingPayload,
  CameraShakePayload,
  ParallaxCreatePayload,
  HDREnhancePayload,
  SkinCorrectPayload,
  FlickerRemovePayload,
  FaceRestorePayload,
  VideoRestorePayload,
  SubtitleAnimatePayload,
  EmojiInsertPayload,
  TemplateApplyPayload,
  BrandApplyPayload,
  ObjectTrackPayload,
  FaceTrackPayload,
  EffectGlowPayload,
  EffectBlurPayload,
  GreenscreenRemovePayload,
  CommandCinematicPayload,
  CommandFixColorAudioPayload,
  CommandViralReelPayload,
  HelpStepByStepPayload,
  HelpExplainPayload,
  TitleGeneratePayload,
  HookGeneratePayload,
  CaptionGeneratePayload,
  HashtagGeneratePayload,
  ViralityPredictPayload,
  PostTimeSuggestPayload,
  ABTestCreatePayload,
  ActorReplacePayload,
  AvatarCreatePayload,
  EyeContactCorrectPayload,
  GestureAddPayload,
  ScriptToVideoPayload,
  CameraFramePayload,
  TextToShortVideoPayload,
} from "../types/aiJob";
import type { AIProvider, AIProviderConfig, SubtitleSegment, CutPoint } from "../types/aiTypes";

// AI Service with dual integration: mock functions + API integration structure

// Provider configuration
let currentProvider: AIProvider = "mock";
let providerConfig: AIProviderConfig = {
  provider: "mock",
};

export function setAIProvider(provider: AIProvider, config?: Partial<AIProviderConfig>) {
  currentProvider = provider;
  providerConfig = {
    provider,
    ...config,
  };
}

export function getAIProvider(): AIProvider {
  return currentProvider;
}

// API Integration Configuration
const API_CONFIGS = {
  elevenlabs: {
    baseUrl: "https://api.elevenlabs.io/v1",
    timeout: 30000,
    retryAttempts: 3,
  },
  replicate: {
    baseUrl: "https://api.replicate.com/v1",
    timeout: 30000,
    retryAttempts: 3,
  },
  runway: {
    baseUrl: "https://api.runwayml.com/v1",
    timeout: 30000,
    retryAttempts: 3,
  },
  huggingface: {
    baseUrl: "https://api-inference.huggingface.co",
    timeout: 30000,
    retryAttempts: 3,
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    timeout: 30000,
    retryAttempts: 3,
  },
  stability: {
    baseUrl: "https://api.stability.ai/v1",
    timeout: 30000,
    retryAttempts: 3,
  },
};

// Retry logic with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryWithBackoff(fn, attempts - 1, delay * 2);
  }
}

// API request handler with timeout and error handling
async function apiRequest<T>(
  url: string,
  options: RequestInit,
  timeout: number = 30000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("API request timeout");
      }
      throw new Error(`API request error: ${error.message}`);
    }
    throw error;
  }
}

// Mock AI Functions (return realistic placeholder data)

export async function mockGenerateImage(payload: ImageGeneratePayload): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const canvas = document.createElement("canvas");
  const size = parseInt(payload.size.split("x")[0]) || 512;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#06b6d4");
    gradient.addColorStop(0.5, "#8b5cf6");
    gradient.addColorStop(1, "#ec4899");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "white";
    ctx.font = `${size / 20}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AI Generated", size / 2, size / 2 - 20);
    ctx.font = `${size / 30}px sans-serif`;
    ctx.fillText(payload.prompt.substring(0, 30), size / 2, size / 2 + 20);
  }

  return canvas.toDataURL("image/png");
}

export async function mockGenerateVideo(payload: VideoGeneratePayload): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0";
}

export async function mockAutoCut(payload: AutoCutPayload): Promise<CutPoint[]> {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const cutPoints: CutPoint[] = [];
  const duration = 60;

  if (payload.style === "reel") {
    for (let i = 0; i < duration; i += 2.5) {
      cutPoints.push({ start: i, end: i + 2.5, type: "highlight" });
    }
  } else if (payload.style === "smooth") {
    for (let i = 0; i < duration; i += 6) {
      cutPoints.push({ start: i, end: i + 6, type: "transition" });
    }
  } else if (payload.style === "energetic") {
    for (let i = 0; i < duration; i += 1.5) {
      cutPoints.push({ start: i, end: i + 1.5, type: "highlight" });
    }
  } else {
    for (let i = 0; i < duration; i += 10) {
      cutPoints.push({ start: i, end: i + 10, type: "transition" });
    }
  }

  if (payload.removeSilence) {
    cutPoints.push({ start: 15, end: 18, type: "silence" });
    cutPoints.push({ start: 35, end: 37, type: "silence" });
  }

  return cutPoints;
}

export async function mockAutoSubtitle(payload: AutoSubtitlePayload): Promise<SubtitleSegment[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const subtitles: SubtitleSegment[] = [
    { start: 0.5, end: 2.0, text: "Welcome back", emoji: payload.addEmoji ? "👋" : undefined },
    { start: 2.1, end: 4.5, text: "to our video editing tutorial", emoji: payload.addEmoji ? "🎬" : undefined },
    { start: 4.6, end: 7.0, text: "Today we're going to learn", emoji: undefined },
    { start: 7.1, end: 9.5, text: "how to use AI tools", emoji: payload.addEmoji ? "🤖" : undefined },
    { start: 9.6, end: 12.0, text: "to make amazing videos", emoji: payload.addEmoji ? "✨" : undefined },
    { start: 12.1, end: 14.5, text: "Let's get started", emoji: payload.addEmoji ? "🚀" : undefined },
  ];

  return subtitles;
}

export async function mockEnhance(payload: EnhancePayload): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return payload.videoUrl + "?enhanced=true";
}

export async function mockUpscale(payload: UpscalePayload): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return payload.mediaUrl + `?upscaled=${payload.target}`;
}

export async function mockChatHelp(payload: ChatHelpPayload): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const message = payload.message.toLowerCase();

  if (message.includes("subtitle") || message.includes("caption")) {
    return `To add auto subtitles:\n\n1. Open your video project\n2. Click AI Tools → Auto Subtitles\n3. Choose language and style\n4. Click Generate\n5. Subtitles will appear on the timeline\n\nYou can edit the text, timing, and styling after generation.`;
  } else if (message.includes("cut") || message.includes("trim")) {
    return `To use Auto Cut:\n\n1. Upload your video\n2. Select a cutting style (Reel, Smooth, Energetic, or Minimal)\n3. Enable "Remove Silence" if needed\n4. Click Process\n5. Review the cuts and apply to timeline\n\nAuto Cut detects silence, bad frames, and highlights automatically.`;
  } else if (message.includes("export")) {
    return `To export your video:\n\n1. Click the Export button in the toolbar\n2. Choose your format (MP4, MOV, WebM)\n3. Select quality settings\n4. Click Export\n5. Wait for processing to complete\n\nYour video will be downloaded automatically when ready.`;
  } else if (message.includes("enhance") || message.includes("quality")) {
    return `To enhance your video:\n\n1. Go to AI Tools → Auto Enhance\n2. Upload your video\n3. Enable video enhancements (color correction, sharpen, denoise)\n4. Enable audio enhancements (noise removal, voice boost, normalize)\n5. Click Enhance\n\nYou can toggle enhancements on/off after processing.`;
  } else if (message.includes("upscale") || message.includes("resolution")) {
    return `To upscale your video:\n\n1. Go to AI Tools → Auto Upscale\n2. Upload your video or image\n3. Select target resolution (1080p, 4K, or 8K)\n4. Enable face preservation and noise reduction if needed\n5. Click Upscale\n\nUpscaling uses AI to increase resolution while preserving quality.`;
  } else if (message.includes("image") || message.includes("generate")) {
    return `To generate AI images:\n\n1. Go to AI Tools → Image Generator\n2. Describe the image you want in the prompt\n3. Choose size and style\n4. Click Generate\n5. Images are automatically added to your assets library\n\nYou can use generated images as backgrounds, thumbnails, or stickers.`;
  } else {
    return `I'm here to help! I can assist you with:\n\n• Adding subtitles and captions\n• Auto-cutting videos\n• Enhancing video and audio quality\n• Upscaling resolution\n• Generating AI images and videos\n• Exporting projects\n• Using the timeline and effects\n\nWhat would you like to know more about?`;
  }
}

// Generation AI mock functions
export async function mockVoiceClone(payload: VoiceClonePayload): Promise<{ audioUrl: string; voiceId: string; sampleRate: number }> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    audioUrl: "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA",
    voiceId: `voice_${Date.now()}`,
    sampleRate: 44100,
  };
}

export async function mockMusicGenerate(payload: MusicGeneratePayload): Promise<{ audioUrl: string; duration: number; bpm: number; waveform: number[] }> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const waveform = Array.from({ length: 100 }, () => Math.random() * 100);
  return {
    audioUrl: "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA",
    duration: payload.duration,
    bpm: payload.bpm || 120,
    waveform,
  };
}

export async function mockBRollGenerate(payload: BRollGeneratePayload): Promise<{ videoUrl: string; scenes: Array<{ start: number; end: number; description: string }> }> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const sceneDuration = payload.duration / 3;
  return {
    videoUrl: "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0",
    scenes: [
      { start: 0, end: sceneDuration, description: "Opening scene" },
      { start: sceneDuration, end: sceneDuration * 2, description: "Main content" },
      { start: sceneDuration * 2, end: payload.duration, description: "Closing scene" },
    ],
  };
}

export async function mockLogoGenerate(payload: LogoGeneratePayload): Promise<{ logos: Array<{ url: string; variant: string }> }> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    logos: [
      { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", variant: "primary" },
      { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", variant: "secondary" },
      { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", variant: "monochrome" },
      { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", variant: "icon" },
    ],
  };
}

export async function mockStickerGenerate(payload: StickerGeneratePayload): Promise<{ imageUrl: string; transparent: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return {
    imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    transparent: payload.background === "transparent",
  };
}

export async function mockCharacterGenerate(payload: CharacterGeneratePayload): Promise<{ images: Array<{ url: string; pose: string }>; consistencyScore: number }> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const poses = payload.poses || ["front", "side"];
  return {
    images: poses.map((pose) => ({
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      pose,
    })),
    consistencyScore: payload.consistency ? 95 : 75,
  };
}

// Editing AI mock functions
export async function mockHighlightDetect(payload: HighlightDetectPayload): Promise<Array<{ timestamp: number; duration: number; confidence: number; criteria: string; thumbnail: string }>> {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  return [
    { timestamp: 5.2, duration: 3.5, confidence: 92, criteria: "Loudness peaks", thumbnail: "" },
    { timestamp: 15.8, duration: 2.1, confidence: 87, criteria: "Motion intensity", thumbnail: "" },
    { timestamp: 28.3, duration: 4.2, confidence: 95, criteria: "Face detection", thumbnail: "" },
    { timestamp: 42.1, duration: 2.8, confidence: 89, criteria: "Scene change", thumbnail: "" },
  ];
}

export async function mockTimelineSuggest(payload: TimelineSuggestPayload): Promise<Array<{ type: string; timestamp: number; reasoning: string; preview: string; confidence: number }>> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [
    { type: "cuts", timestamp: 10.5, reasoning: "Natural pause detected", preview: "", confidence: 88 },
    { type: "effects", timestamp: 20.2, reasoning: "Add transition for smooth flow", preview: "", confidence: 82 },
    { type: "zooms", timestamp: 35.7, reasoning: "Emphasize key moment", preview: "", confidence: 90 },
    { type: "cuts", timestamp: 48.3, reasoning: "Scene change opportunity", preview: "", confidence: 85 },
  ];
}

export async function mockMotionAutoKeyframe(payload: MotionAutoKeyframePayload): Promise<{ keyframes: Array<{ time: number; value: number }> }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { keyframes: [{ time: 0, value: 0 }, { time: 0.5, value: 50 }, { time: 1, value: 100 }] };
}

export async function mockMotionAutoEasing(payload: MotionAutoEasingPayload): Promise<{ easing: string; curve: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { easing: "ease-in-out", curve: "cubic-bezier(0.4, 0, 0.2, 1)" };
}

export async function mockCameraShake(payload: CameraShakePayload): Promise<{ shakeData: string; intensity: number }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { shakeData: "applied", intensity: payload.intensity };
}

export async function mockParallaxCreate(payload: ParallaxCreatePayload): Promise<{ parallaxData: string; depth: number; layers: number }> {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return { parallaxData: "applied", depth: payload.depth, layers: 3 };
}

// Enhancement AI mock functions
export async function mockHDREnhance(payload: HDREnhancePayload): Promise<{ mediaUrl: string; intensity: number; toneMapping: string }> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return {
    mediaUrl: payload.mediaUrl + "?hdr=true",
    intensity: payload.intensity || 50,
    toneMapping: payload.toneMapping || "aces",
  };
}

export async function mockSkinCorrect(payload: SkinCorrectPayload): Promise<{ videoUrl: string; adjustments: { brightness: number; warmth: number; smoothness: number } }> {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  return {
    videoUrl: payload.videoUrl + "?skinCorrected=true",
    adjustments: {
      brightness: payload.brightness || 0,
      warmth: payload.warmth || 0,
      smoothness: payload.smoothness || 50,
    },
  };
}

export async function mockFlickerRemove(payload: FlickerRemovePayload): Promise<{ videoUrl: string; flickersRemoved: number }> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    videoUrl: payload.videoUrl + "?flickerRemoved=true",
    flickersRemoved: 47,
  };
}

export async function mockFaceRestore(payload: FaceRestorePayload): Promise<{ mediaUrl: string; facesRestored: number; quality: number }> {
  await new Promise((resolve) => setTimeout(resolve, 4500));
  return {
    mediaUrl: payload.mediaUrl + "?faceRestored=true",
    facesRestored: 3,
    quality: 92,
  };
}

export async function mockVideoRestore(payload: VideoRestorePayload): Promise<{ videoUrl: string; improvements: string[]; quality: number }> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    videoUrl: payload.videoUrl + "?restored=true",
    improvements: ["Noise reduction", "Color correction", "Sharpness enhancement", "Artifact removal"],
    quality: 88,
  };
}

// Creator AI mock functions
export async function mockSubtitleAnimate(payload: SubtitleAnimatePayload): Promise<{ animatedSubtitle: string; animation: string; duration: number }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    animatedSubtitle: "applied",
    animation: payload.animation,
    duration: payload.duration || 0.5,
  };
}

export async function mockEmojiInsert(payload: EmojiInsertPayload): Promise<{ emojis: string[]; positions: Array<{ emoji: string; timestamp: number }> }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    emojis: ["😊", "🎉", "✨", "🔥", "💯"],
    positions: [
      { emoji: "😊", timestamp: 2.5 },
      { emoji: "🎉", timestamp: 5.0 },
      { emoji: "✨", timestamp: 8.2 },
    ],
  };
}

export async function mockTemplateApply(payload: TemplateApplyPayload): Promise<{ templateApplied: boolean; templateId: string; customizations: number }> {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return {
    templateApplied: true,
    templateId: payload.templateId,
    customizations: Object.keys(payload.customization || {}).length,
  };
}

export async function mockBrandApply(payload: BrandApplyPayload): Promise<{ brandApplied: boolean; brandKitId: string; elementsApplied: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    brandApplied: true,
    brandKitId: payload.brandKitId,
    elementsApplied: ["Logo", "Colors", "Fonts", "Watermark"],
  };
}

export async function mockObjectTrack(payload: ObjectTrackPayload): Promise<{ trackingPath: Array<{ x: number; y: number; time: number }>; confidence: number }> {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  return {
    trackingPath: [
      { x: 100, y: 100, time: 0 },
      { x: 150, y: 120, time: 0.5 },
      { x: 200, y: 150, time: 1 },
      { x: 250, y: 180, time: 1.5 },
    ],
    confidence: 94,
  };
}

export async function mockFaceTrack(payload: FaceTrackPayload): Promise<{ faceTrackingPath: Array<{ x: number; y: number; time: number }>; facesDetected: number }> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    faceTrackingPath: [
      { x: 150, y: 120, time: 0 },
      { x: 160, y: 125, time: 0.5 },
      { x: 180, y: 130, time: 1 },
    ],
    facesDetected: 1,
  };
}

export async function mockEffectGlow(payload: EffectGlowPayload): Promise<{ glowApplied: boolean; color: string; intensity: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    glowApplied: true,
    color: payload.color,
    intensity: payload.intensity,
  };
}

export async function mockEffectBlur(payload: EffectBlurPayload): Promise<{ blurApplied: boolean; radius: number; type: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    blurApplied: true,
    radius: payload.radius,
    type: payload.type || "gaussian",
  };
}

export async function mockGreenscreenRemove(payload: GreenscreenRemovePayload): Promise<{ videoUrl: string; backgroundRemoved: boolean; quality: number }> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return {
    videoUrl: payload.videoUrl + "?backgroundRemoved=true",
    backgroundRemoved: true,
    quality: 91,
  };
}

// Assistant AI mock functions
export async function mockCommandCinematic(payload: CommandCinematicPayload): Promise<{ cinematicApplied: boolean; effects: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return {
    cinematicApplied: true,
    effects: ["Color grading", "Letterbox", "Motion blur", "Depth of field"],
  };
}

export async function mockCommandFixColorAudio(payload: CommandFixColorAudioPayload): Promise<{ fixed: boolean; colorAdjustments: string[]; audioAdjustments: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    fixed: true,
    colorAdjustments: ["White balance", "Exposure", "Contrast", "Saturation"],
    audioAdjustments: ["Noise removal", "Normalization", "EQ adjustment"],
  };
}

export async function mockCommandViralReel(payload: CommandViralReelPayload): Promise<{ viralReelCreated: boolean; features: string[]; score: number }> {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  return {
    viralReelCreated: true,
    features: ["Dynamic cuts", "Trending music", "Captions", "Hooks", "CTA"],
    score: 87,
  };
}

export async function mockHelpStepByStep(payload: HelpStepByStepPayload): Promise<{ guide: string; steps: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    guide: `Step-by-step guide for ${payload.task}`,
    steps: [
      "First, prepare your materials",
      "Next, set up your workspace",
      "Then, follow the main process",
      "Finally, review and finalize",
    ],
  };
}

export async function mockHelpExplain(payload: HelpExplainPayload): Promise<{ explanation: string; relatedConcepts: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    explanation: `${payload.concept} is a technique used in video editing that allows you to...`,
    relatedConcepts: ["Keyframes", "Timeline", "Effects", "Transitions"],
  };
}

// Growth AI mock functions
export async function mockTitleGenerate(payload: TitleGeneratePayload): Promise<Array<{ title: string; engagement: number; charCount: number }>> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { title: "Amazing Video Title 1", engagement: 92, charCount: 45 },
    { title: "Incredible Content Here 2", engagement: 88, charCount: 48 },
    { title: "Must Watch This Now 3", engagement: 85, charCount: 42 },
    { title: "You Won't Believe This 4", engagement: 90, charCount: 47 },
    { title: "The Ultimate Guide To 5", engagement: 87, charCount: 44 },
    { title: "How To Master This 6", engagement: 89, charCount: 41 },
    { title: "Secret Tips Revealed 7", engagement: 91, charCount: 43 },
    { title: "Pro Techniques Explained 8", engagement: 86, charCount: 49 },
    { title: "Game Changing Method 9", engagement: 93, charCount: 46 },
    { title: "Transform Your Content 10", engagement: 88, charCount: 47 },
  ];
}

export async function mockHookGenerate(payload: HookGeneratePayload): Promise<Array<{ hook: string; attentionScore: number; type: string }>> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { hook: "Wait until you see this...", attentionScore: 95, type: "Teaser" },
    { hook: "Did you know that...?", attentionScore: 88, type: "Question" },
    { hook: "This will change everything", attentionScore: 92, type: "Statement" },
    { hook: "You're doing this wrong", attentionScore: 90, type: "Shock Value" },
    { hook: "Here's the secret...", attentionScore: 87, type: "Teaser" },
    { hook: "Stop scrolling!", attentionScore: 93, type: "Statement" },
    { hook: "What if I told you...", attentionScore: 89, type: "Question" },
    { hook: "This is insane!", attentionScore: 91, type: "Shock Value" },
    { hook: "Watch this closely...", attentionScore: 86, type: "Teaser" },
    { hook: "Nobody talks about this", attentionScore: 94, type: "Statement" },
  ];
}

export async function mockCaptionGenerate(payload: CaptionGeneratePayload): Promise<Array<{ caption: string; engagement: number; charCount: number }>> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { caption: "Amazing content! Check this out 🔥 #viral #trending", engagement: 90, charCount: 52 },
    { caption: "You need to see this! 👀 #mustsee #amazing", engagement: 87, charCount: 48 },
    { caption: "Game changer! 💯 #tips #tutorial", engagement: 92, charCount: 41 },
    { caption: "This is incredible! ✨ #wow #awesome", engagement: 88, charCount: 43 },
    { caption: "Mind blown! 🤯 #insane #unbelievable", engagement: 91, charCount: 45 },
  ];
}

export async function mockHashtagGenerate(payload: HashtagGeneratePayload): Promise<{ hashtags: string[]; reach: Record<string, number> }> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return {
    hashtags: ["#viral", "#trending", "#fyp", "#foryou", "#explore", "#instagood", "#reels", "#tiktok"],
    reach: {
      "#viral": 1200000,
      "#trending": 980000,
      "#fyp": 2500000,
      "#foryou": 1800000,
    },
  };
}

export async function mockViralityPredict(payload: ViralityPredictPayload): Promise<{ score: number; factors: Array<{ name: string; impact: number }>; suggestions: string[] }> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    score: 78,
    factors: [
      { name: "Hook strength", impact: 85 },
      { name: "Pacing", impact: 72 },
      { name: "Visual quality", impact: 90 },
      { name: "Audio quality", impact: 68 },
      { name: "Trending elements", impact: 75 },
    ],
    suggestions: [
      "Add a stronger hook in the first 3 seconds",
      "Increase pacing with faster cuts",
      "Add trending music",
      "Include captions for accessibility",
    ],
  };
}

export async function mockPostTimeSuggest(payload: PostTimeSuggestPayload): Promise<{ optimalTimes: Array<{ day: string; time: string; score: number }>; timezone: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    optimalTimes: [
      { day: "Monday", time: "18:00", score: 92 },
      { day: "Wednesday", time: "12:00", score: 88 },
      { day: "Friday", time: "17:00", score: 95 },
      { day: "Sunday", time: "20:00", score: 90 },
    ],
    timezone: "UTC",
  };
}

export async function mockABTestCreate(payload: ABTestCreatePayload): Promise<{ testId: string; variations: Array<{ id: string; name: string }>; duration: number }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    testId: `test_${Date.now()}`,
    variations: payload.variations.map((v, i) => ({ id: `var_${i}`, name: v })),
    duration: payload.duration || 7,
  };
}

// Experimental AI mock functions
export async function mockActorReplace(payload: ActorReplacePayload): Promise<{ videoUrl: string; facesReplaced: number; quality: number }> {
  await new Promise((resolve) => setTimeout(resolve, 6000));
  return {
    videoUrl: payload.videoUrl + "?actorReplaced=true",
    facesReplaced: 1,
    quality: 89,
  };
}

export async function mockAvatarCreate(payload: AvatarCreatePayload): Promise<{ videoUrl: string; avatarId: string; duration: number }> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    videoUrl: "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0",
    avatarId: `avatar_${Date.now()}`,
    duration: payload.script.split(" ").length * 0.5,
  };
}

export async function mockEyeContactCorrect(payload: EyeContactCorrectPayload): Promise<{ videoUrl: string; framesAdjusted: number; quality: number }> {
  await new Promise((resolve) => setTimeout(resolve, 4500));
  return {
    videoUrl: payload.videoUrl + "?eyeContactCorrected=true",
    framesAdjusted: 342,
    quality: 93,
  };
}

export async function mockGestureAdd(payload: GestureAddPayload): Promise<{ videoUrl: string; gesturesAdded: number; timing: number[] }> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return {
    videoUrl: payload.videoUrl + "?gesturesAdded=true",
    gesturesAdded: 5,
    timing: [2.5, 5.0, 8.2, 12.1, 15.8],
  };
}

export async function mockScriptToVideo(payload: ScriptToVideoPayload): Promise<{ videoUrl: string; scenes: number; duration: number }> {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  return {
    videoUrl: "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0",
    scenes: payload.script.split(".").length,
    duration: payload.script.split(" ").length * 0.4,
  };
}

export async function mockCameraFrame(payload: CameraFramePayload): Promise<{ videoUrl: string; framingApplied: string; adjustments: number }> {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  return {
    videoUrl: payload.videoUrl + "?cameraFramed=true",
    framingApplied: payload.framingType,
    adjustments: 127,
  };
}

export async function mockTextToShortVideo(payload: TextToShortVideoPayload): Promise<{ videoUrl: string; duration: number; aspectRatio: string }> {
  await new Promise((resolve) => setTimeout(resolve, 6000));
  return {
    videoUrl: "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0",
    duration: payload.duration,
    aspectRatio: payload.platform === "tiktok" || payload.platform === "instagram" ? "9:16" : "16:9",
  };
}

// API Integration Points (ready for real implementation)

export async function callElevenLabsAPI(payload: VoiceClonePayload): Promise<any> {
  if (!providerConfig.apiKey) {
    throw new Error("ElevenLabs API key not configured");
  }

  return retryWithBackoff(
    () =>
      apiRequest(
        `${API_CONFIGS.elevenlabs.baseUrl}/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": providerConfig.apiKey!,
          },
          body: JSON.stringify({
            voice_id: payload.voiceName,
            audio_url: payload.audioUrl,
          }),
        },
        API_CONFIGS.elevenlabs.timeout
      ),
    API_CONFIGS.elevenlabs.retryAttempts
  );
}

export async function callReplicateAPI(model: string, input: any): Promise<any> {
  if (!providerConfig.apiKey) {
    throw new Error("Replicate API key not configured");
  }

  return retryWithBackoff(
    () =>
      apiRequest(
        `${API_CONFIGS.replicate.baseUrl}/predictions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${providerConfig.apiKey}`,
          },
          body: JSON.stringify({
            version: model,
            input,
          }),
        },
        API_CONFIGS.replicate.timeout
      ),
    API_CONFIGS.replicate.retryAttempts
  );
}

export async function callRunwayAPI(endpoint: string, payload: any): Promise<any> {
  if (!providerConfig.apiKey) {
    throw new Error("Runway API key not configured");
  }

  return retryWithBackoff(
    () =>
      apiRequest(
        `${API_CONFIGS.runway.baseUrl}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${providerConfig.apiKey}`,
          },
          body: JSON.stringify(payload),
        },
        API_CONFIGS.runway.timeout
      ),
    API_CONFIGS.runway.retryAttempts
  );
}

export async function callHuggingFaceAPI(model: string, inputs: any): Promise<any> {
  if (!providerConfig.apiKey) {
    throw new Error("Hugging Face API key not configured");
  }

  return retryWithBackoff(
    () =>
      apiRequest(
        `${API_CONFIGS.huggingface.baseUrl}/models/${model}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${providerConfig.apiKey}`,
          },
          body: JSON.stringify({ inputs }),
        },
        API_CONFIGS.huggingface.timeout
      ),
    API_CONFIGS.huggingface.retryAttempts
  );
}

export async function callOpenAIAPI(endpoint: string, payload: any): Promise<any> {
  if (!providerConfig.apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  return retryWithBackoff(
    () =>
      apiRequest(
        `${API_CONFIGS.openai.baseUrl}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${providerConfig.apiKey}`,
          },
          body: JSON.stringify(payload),
        },
        API_CONFIGS.openai.timeout
      ),
    API_CONFIGS.openai.retryAttempts
  );
}

export async function callStabilityAPI(endpoint: string, payload: any): Promise<any> {
  if (!providerConfig.apiKey) {
    throw new Error("Stability AI API key not configured");
  }

  return retryWithBackoff(
    () =>
      apiRequest(
        `${API_CONFIGS.stability.baseUrl}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${providerConfig.apiKey}`,
          },
          body: JSON.stringify(payload),
        },
        API_CONFIGS.stability.timeout
      ),
    API_CONFIGS.stability.retryAttempts
  );
}
