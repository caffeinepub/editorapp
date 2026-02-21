// Shared AIJob type system for all AI operations (expanded to 50+ job types)

export type AIJobType =
  // Existing 7 core AI tools
  | "image.generate"
  | "video.generate"
  | "auto.cut"
  | "auto.subtitle"
  | "enhance"
  | "upscale"
  | "chat.help"
  // Generation AI (6 new)
  | "voice.clone"
  | "music.generate"
  | "broll.generate"
  | "logo.generate"
  | "sticker.generate"
  | "character.generate"
  // Editing AI (6 new)
  | "highlight.detect"
  | "timeline.suggest"
  | "motion.autoKeyframe"
  | "motion.autoEasing"
  | "camera.shake"
  | "parallax.create"
  // Enhancement AI (5 new)
  | "hdr.enhance"
  | "skin.correct"
  | "flicker.remove"
  | "face.restore"
  | "video.restore"
  // Creator AI (9 new)
  | "subtitle.animate"
  | "emoji.insert"
  | "template.apply"
  | "brand.apply"
  | "object.track"
  | "face.track"
  | "effect.glow"
  | "effect.blur"
  | "greenscreen.remove"
  // Assistant AI (5 new)
  | "command.cinematic"
  | "command.fixColorAudio"
  | "command.viralReel"
  | "help.stepByStep"
  | "help.explain"
  // Growth AI (7 new)
  | "title.generate"
  | "hook.generate"
  | "caption.generate"
  | "hashtag.generate"
  | "virality.predict"
  | "postTime.suggest"
  | "abTest.create"
  // Experimental AI (7 new)
  | "actor.replace"
  | "avatar.create"
  | "eyeContact.correct"
  | "gesture.add"
  | "script.toVideo"
  | "camera.frame"
  | "text.toShortVideo";

// Existing payload interfaces
export interface ImageGeneratePayload {
  prompt: string;
  size: string;
  style?: string;
}

export interface VideoGeneratePayload {
  prompt: string;
  duration: number;
  aspectRatio: string;
}

export interface AutoCutPayload {
  videoUrl: string;
  style: string;
  removeSilence: boolean;
}

export interface AutoSubtitlePayload {
  videoUrl: string;
  language: string;
  style: string;
  font?: string;
  position?: string;
  addEmoji?: boolean;
}

export interface EnhancePayload {
  videoUrl: string;
  video: boolean;
  audio: boolean;
  videoOptions?: {
    colorCorrection?: boolean;
    sharpen?: boolean;
    denoise?: boolean;
  };
  audioOptions?: {
    noiseRemoval?: boolean;
    voiceBoost?: boolean;
    normalize?: boolean;
  };
}

export interface UpscalePayload {
  mediaUrl: string;
  target: string;
  facePreservation?: boolean;
  noiseReduction?: boolean;
}

export interface ChatHelpPayload {
  message: string;
  context: string;
  editorState?: any;
}

// Generation AI payloads
export interface VoiceClonePayload {
  audioUrl: string;
  voiceName: string;
}

export interface MusicGeneratePayload {
  prompt: string;
  duration: number;
  mood: string;
  genre?: string;
  bpm?: number;
}

export interface BRollGeneratePayload {
  description: string;
  duration: number;
  style?: string;
  resolution?: string;
}

export interface LogoGeneratePayload {
  brandName: string;
  style: string;
  colors: string[];
  iconPreferences?: string;
}

export interface StickerGeneratePayload {
  prompt: string;
  style: string;
  size?: string;
  background?: string;
}

export interface CharacterGeneratePayload {
  description: string;
  consistency: boolean;
  poses?: string[];
  style?: string;
}

// Editing AI payloads
export interface HighlightDetectPayload {
  videoUrl: string;
  criteria: string[];
  thresholds?: Record<string, number>;
}

export interface TimelineSuggestPayload {
  videoUrl: string;
  suggestType: "cuts" | "effects" | "zooms";
  projectId?: string;
}

export interface MotionAutoKeyframePayload {
  clipId: string;
  property: string;
}

export interface MotionAutoEasingPayload {
  clipId: string;
}

export interface CameraShakePayload {
  clipId: string;
  intensity: number;
}

export interface ParallaxCreatePayload {
  clipId: string;
  depth: number;
  intensity?: number;
}

// Enhancement AI payloads
export interface HDREnhancePayload {
  mediaUrl: string;
  intensity?: number;
  toneMapping?: string;
}

export interface SkinCorrectPayload {
  videoUrl: string;
  brightness?: number;
  warmth?: number;
  smoothness?: number;
}

export interface FlickerRemovePayload {
  videoUrl: string;
  intensity?: number;
}

export interface FaceRestorePayload {
  mediaUrl: string;
  detailEnhancement?: boolean;
  featureSharpening?: boolean;
}

export interface VideoRestorePayload {
  videoUrl: string;
  type: "old" | "damaged" | "lowQuality";
  options?: string[];
}

// Creator AI payloads
export interface SubtitleAnimatePayload {
  subtitleId: string;
  animation: string;
  duration?: number;
  delay?: number;
}

export interface EmojiInsertPayload {
  subtitleId: string;
  keyword: string;
  emojiStyle?: string;
  position?: string;
}

export interface TemplateApplyPayload {
  templateId: string;
  projectId: string;
  customization?: Record<string, any>;
}

export interface BrandApplyPayload {
  brandKitId: string;
  projectId: string;
}

export interface ObjectTrackPayload {
  videoUrl: string;
  objectType: string;
  manualSelection?: any;
}

export interface FaceTrackPayload {
  videoUrl: string;
}

export interface EffectGlowPayload {
  clipId: string;
  color: string;
  intensity: number;
  spread?: number;
}

export interface EffectBlurPayload {
  clipId: string;
  radius: number;
  type?: string;
}

export interface GreenscreenRemovePayload {
  videoUrl: string;
  edgeFeathering?: number;
  spillSuppression?: number;
}

// Assistant AI payloads
export interface CommandCinematicPayload {
  clipId: string;
}

export interface CommandFixColorAudioPayload {
  videoUrl: string;
}

export interface CommandViralReelPayload {
  videoUrl: string;
}

export interface HelpStepByStepPayload {
  task: string;
}

export interface HelpExplainPayload {
  concept: string;
}

// Growth AI payloads
export interface TitleGeneratePayload {
  videoDescription: string;
  platform: string;
  tone?: string;
  keywords?: string[];
}

export interface HookGeneratePayload {
  videoDescription: string;
  targetAudience?: string;
  hookStyle?: string;
}

export interface CaptionGeneratePayload {
  videoDescription: string;
  tone: string;
  platform?: string;
  emojiEnabled?: boolean;
  hashtagCount?: number;
}

export interface HashtagGeneratePayload {
  videoDescription: string;
  platform: string;
  count?: number;
  competition?: string;
}

export interface ViralityPredictPayload {
  videoUrl: string;
  criteria?: string[];
}

export interface PostTimeSuggestPayload {
  platform: string;
  audience: string;
  contentType?: string;
}

export interface ABTestCreatePayload {
  variations: string[];
  testType?: string;
  duration?: number;
  successMetric?: string;
}

// Experimental AI payloads
export interface ActorReplacePayload {
  videoUrl: string;
  targetFaceUrl: string;
  expressionPreservation?: boolean;
}

export interface AvatarCreatePayload {
  script: string;
  avatarStyle: string;
  voice?: string;
  language?: string;
  background?: string;
}

export interface EyeContactCorrectPayload {
  videoUrl: string;
  correctionStrength?: number;
  targetGazePoint?: string;
}

export interface GestureAddPayload {
  videoUrl: string;
  gestureType: string;
  timing?: number;
  handModel?: string;
  intensity?: number;
}

export interface ScriptToVideoPayload {
  script: string;
  style: string;
  visualStyle?: string;
  voiceOver?: boolean;
  music?: boolean;
}

export interface CameraFramePayload {
  videoUrl: string;
  framingType: string;
  subjectTracking?: boolean;
}

export interface TextToShortVideoPayload {
  prompt: string;
  duration: number;
  platform?: string;
  style?: string;
}

// Union type for all payloads
export type AIJobPayload =
  | ImageGeneratePayload
  | VideoGeneratePayload
  | AutoCutPayload
  | AutoSubtitlePayload
  | EnhancePayload
  | UpscalePayload
  | ChatHelpPayload
  | VoiceClonePayload
  | MusicGeneratePayload
  | BRollGeneratePayload
  | LogoGeneratePayload
  | StickerGeneratePayload
  | CharacterGeneratePayload
  | HighlightDetectPayload
  | TimelineSuggestPayload
  | MotionAutoKeyframePayload
  | MotionAutoEasingPayload
  | CameraShakePayload
  | ParallaxCreatePayload
  | HDREnhancePayload
  | SkinCorrectPayload
  | FlickerRemovePayload
  | FaceRestorePayload
  | VideoRestorePayload
  | SubtitleAnimatePayload
  | EmojiInsertPayload
  | TemplateApplyPayload
  | BrandApplyPayload
  | ObjectTrackPayload
  | FaceTrackPayload
  | EffectGlowPayload
  | EffectBlurPayload
  | GreenscreenRemovePayload
  | CommandCinematicPayload
  | CommandFixColorAudioPayload
  | CommandViralReelPayload
  | HelpStepByStepPayload
  | HelpExplainPayload
  | TitleGeneratePayload
  | HookGeneratePayload
  | CaptionGeneratePayload
  | HashtagGeneratePayload
  | ViralityPredictPayload
  | PostTimeSuggestPayload
  | ABTestCreatePayload
  | ActorReplacePayload
  | AvatarCreatePayload
  | EyeContactCorrectPayload
  | GestureAddPayload
  | ScriptToVideoPayload
  | CameraFramePayload
  | TextToShortVideoPayload;

// Base AIJob interface
export interface AIJob {
  id: string;
  type: AIJobType;
  payload: AIJobPayload;
  status?: "queued" | "processing" | "completed" | "failed";
  progress?: number;
  results?: any;
  error?: string;
  submittedAt?: number;
  completedAt?: number;
}

// AI Category type for organization
export type AICategory =
  | "generation"
  | "editing"
  | "enhancement"
  | "creator"
  | "assistant"
  | "growth"
  | "experimental";
