import { createRouter, createRoute, createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const VideoEditor = lazy(() => import("./pages/VideoEditor"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));

// AI Tool Pages - Generation
const ImageGenerator = lazy(() => import("./pages/ai/ImageGenerator"));
const VideoGenerator = lazy(() => import("./pages/ai/VideoGenerator"));
const VoiceClone = lazy(() => import("./pages/ai/VoiceClone"));
const MusicGenerate = lazy(() => import("./pages/ai/MusicGenerate"));
const BRollGenerate = lazy(() => import("./pages/ai/BRollGenerate"));
const LogoGenerate = lazy(() => import("./pages/ai/LogoGenerate"));
const StickerGenerate = lazy(() => import("./pages/ai/StickerGenerate"));
const CharacterGenerate = lazy(() => import("./pages/ai/CharacterGenerate"));

// AI Tool Pages - Editing
const AutoCutWizard = lazy(() => import("./pages/ai/AutoCutWizard"));
const HighlightDetect = lazy(() => import("./pages/ai/HighlightDetect"));
const TimelineAI = lazy(() => import("./pages/ai/TimelineAI"));
const MotionAI = lazy(() => import("./pages/ai/MotionAI"));

// AI Tool Pages - Enhancement
const AutoEnhance = lazy(() => import("./pages/ai/AutoEnhance"));
const AutoUpscale = lazy(() => import("./pages/ai/AutoUpscale"));
const HDREnhance = lazy(() => import("./pages/ai/HDREnhance"));

// AI Tool Pages - Creator
const CaptionsWizard = lazy(() => import("./pages/ai/CaptionsWizard"));

// AI Tool Pages - Growth
const TitleGenerate = lazy(() => import("./pages/ai/TitleGenerate"));
const HookGenerate = lazy(() => import("./pages/ai/HookGenerate"));

// Other pages
const BackgroundRemoveWizard = lazy(() => import("./pages/ai/BackgroundRemoveWizard"));
const BeatSyncWizard = lazy(() => import("./pages/ai/BeatSyncWizard"));

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const videoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor/video",
  component: VideoEditor,
});

const photoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor/photo",
  component: () => <ComingSoon featureName="Photo Editor" />,
});

// Generation AI Routes
const imageGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/image-gen",
  component: ImageGenerator,
});

const videoGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/video-gen",
  component: VideoGenerator,
});

const voiceCloneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/voice-clone",
  component: VoiceClone,
});

const musicGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/music-gen",
  component: MusicGenerate,
});

const brollGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/broll-gen",
  component: BRollGenerate,
});

const logoGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/logo-gen",
  component: LogoGenerate,
});

const stickerGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/sticker-gen",
  component: StickerGenerate,
});

const characterGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/character-gen",
  component: CharacterGenerate,
});

// Editing AI Routes
const autoCutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/auto-cut",
  component: AutoCutWizard,
});

const highlightDetectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/highlight-detect",
  component: HighlightDetect,
});

const timelineAIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/timeline-ai",
  component: TimelineAI,
});

const motionAIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/motion-ai",
  component: MotionAI,
});

// Enhancement AI Routes
const enhanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/enhance",
  component: AutoEnhance,
});

const upscaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/upscale",
  component: AutoUpscale,
});

const hdrEnhanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/hdr-enhance",
  component: HDREnhance,
});

const skinCorrectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/skin-correct",
  component: () => <ComingSoon featureName="Skin Correction" />,
});

const flickerRemoveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/flicker-remove",
  component: () => <ComingSoon featureName="Flicker Removal" />,
});

const faceRestoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/face-restore",
  component: () => <ComingSoon featureName="Face Restoration" />,
});

const videoRestoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/video-restore",
  component: () => <ComingSoon featureName="Video Restoration" />,
});

// Creator AI Routes
const autoSubtitleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/auto-subtitle",
  component: CaptionsWizard,
});

const subtitleAnimateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/subtitle-animate",
  component: () => <ComingSoon featureName="Subtitle Animation" />,
});

const emojiInsertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/emoji-insert",
  component: () => <ComingSoon featureName="Emoji Insert" />,
});

const templateApplyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/template-apply",
  component: () => <ComingSoon featureName="Template Apply" />,
});

const brandKitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/brand-kit",
  component: () => <ComingSoon featureName="Brand Kit" />,
});

const objectTrackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/object-track",
  component: () => <ComingSoon featureName="Object Tracking" />,
});

const effectStudioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/effect-studio",
  component: () => <ComingSoon featureName="Effect Studio" />,
});

const greenscreenRemoveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/greenscreen-remove",
  component: () => <ComingSoon featureName="Greenscreen Removal" />,
});

// Growth AI Routes
const titleGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/title-gen",
  component: TitleGenerate,
});

const hookGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/hook-gen",
  component: HookGenerate,
});

const captionGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/caption-gen",
  component: () => <ComingSoon featureName="Caption Generator" />,
});

const hashtagGenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/hashtag-gen",
  component: () => <ComingSoon featureName="Hashtag Generator" />,
});

const viralityPredictRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/virality-predict",
  component: () => <ComingSoon featureName="Virality Predictor" />,
});

const postTimeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/post-time",
  component: () => <ComingSoon featureName="Post Time Optimizer" />,
});

const abTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/ab-test",
  component: () => <ComingSoon featureName="A/B Testing" />,
});

// Experimental AI Routes
const actorReplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/actor-replace",
  component: () => <ComingSoon featureName="Actor Replacement" />,
});

const avatarCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/avatar-create",
  component: () => <ComingSoon featureName="Avatar Creator" />,
});

const eyeContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/eye-contact",
  component: () => <ComingSoon featureName="Eye Contact Correction" />,
});

const gestureAddRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/gesture-add",
  component: () => <ComingSoon featureName="Gesture Addition" />,
});

const scriptToVideoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/script-to-video",
  component: () => <ComingSoon featureName="Script to Video" />,
});

const cameraFrameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/camera-frame",
  component: () => <ComingSoon featureName="Camera Framing" />,
});

const textToShortRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/text-to-short",
  component: () => <ComingSoon featureName="Text to Short" />,
});

// Other routes
const backgroundRemoveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/background-remove",
  component: BackgroundRemoveWizard,
});

const beatSyncRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/beat-sync",
  component: BeatSyncWizard,
});

const assistantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai/assistant",
  component: () => <ComingSoon featureName="AI Assistant" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  videoEditorRoute,
  photoEditorRoute,
  imageGenRoute,
  videoGenRoute,
  voiceCloneRoute,
  musicGenRoute,
  brollGenRoute,
  logoGenRoute,
  stickerGenRoute,
  characterGenRoute,
  autoCutRoute,
  highlightDetectRoute,
  timelineAIRoute,
  motionAIRoute,
  enhanceRoute,
  upscaleRoute,
  hdrEnhanceRoute,
  skinCorrectRoute,
  flickerRemoveRoute,
  faceRestoreRoute,
  videoRestoreRoute,
  autoSubtitleRoute,
  subtitleAnimateRoute,
  emojiInsertRoute,
  templateApplyRoute,
  brandKitRoute,
  objectTrackRoute,
  effectStudioRoute,
  greenscreenRemoveRoute,
  titleGenRoute,
  hookGenRoute,
  captionGenRoute,
  hashtagGenRoute,
  viralityPredictRoute,
  postTimeRoute,
  abTestRoute,
  actorReplaceRoute,
  avatarCreateRoute,
  eyeContactRoute,
  gestureAddRoute,
  scriptToVideoRoute,
  cameraFrameRoute,
  textToShortRoute,
  backgroundRemoveRoute,
  beatSyncRoute,
  assistantRoute,
]);

export const router = createRouter({ routeTree });

export type Router = typeof router;
