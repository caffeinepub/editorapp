import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const VideoEditor = lazy(() => import('./pages/VideoEditor'));
const PhotoEditor = lazy(() => import('./pages/PhotoEditor'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));

// AI Tool Pages
const ImageGenerator = lazy(() => import('./pages/ai/ImageGenerator'));
const VideoGenerator = lazy(() => import('./pages/ai/VideoGenerator'));
const AutoCutWizard = lazy(() => import('./pages/ai/AutoCutWizard'));
const CaptionsWizard = lazy(() => import('./pages/ai/CaptionsWizard'));
const BackgroundRemoveWizard = lazy(() => import('./pages/ai/BackgroundRemoveWizard'));
const BeatSyncWizard = lazy(() => import('./pages/ai/BeatSyncWizard'));
const AutoEnhance = lazy(() => import('./pages/ai/AutoEnhance'));
const AutoUpscale = lazy(() => import('./pages/ai/AutoUpscale'));
const VoiceClone = lazy(() => import('./pages/ai/VoiceClone'));
const MusicGenerate = lazy(() => import('./pages/ai/MusicGenerate'));
const BRollGenerate = lazy(() => import('./pages/ai/BRollGenerate'));
const LogoGenerate = lazy(() => import('./pages/ai/LogoGenerate'));
const StickerGenerate = lazy(() => import('./pages/ai/StickerGenerate'));
const CharacterGenerate = lazy(() => import('./pages/ai/CharacterGenerate'));
const HighlightDetect = lazy(() => import('./pages/ai/HighlightDetect'));
const TimelineAI = lazy(() => import('./pages/ai/TimelineAI'));
const MotionAI = lazy(() => import('./pages/ai/MotionAI'));
const HDREnhance = lazy(() => import('./pages/ai/HDREnhance'));
const TitleGenerate = lazy(() => import('./pages/ai/TitleGenerate'));
const HookGenerate = lazy(() => import('./pages/ai/HookGenerate'));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const videoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor/video',
  component: VideoEditor,
});

const photoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor/photo',
  component: PhotoEditor,
});

// AI Tool Routes
const imageGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/image-generator',
  component: ImageGenerator,
});

const videoGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/video-generator',
  component: VideoGenerator,
});

const autoCutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/auto-cut',
  component: AutoCutWizard,
});

const captionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/captions',
  component: CaptionsWizard,
});

const backgroundRemoveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/background-remove',
  component: BackgroundRemoveWizard,
});

const beatSyncRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/beat-sync',
  component: BeatSyncWizard,
});

const autoEnhanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/auto-enhance',
  component: AutoEnhance,
});

const autoUpscaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/auto-upscale',
  component: AutoUpscale,
});

const voiceCloneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/voice-clone',
  component: VoiceClone,
});

const musicGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/music-generate',
  component: MusicGenerate,
});

const bRollGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/broll-generate',
  component: BRollGenerate,
});

const logoGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/logo-generate',
  component: LogoGenerate,
});

const stickerGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/sticker-generate',
  component: StickerGenerate,
});

const characterGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/character-generate',
  component: CharacterGenerate,
});

const highlightDetectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/highlight-detect',
  component: HighlightDetect,
});

const timelineAIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/timeline-ai',
  component: TimelineAI,
});

const motionAIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/motion-ai',
  component: MotionAI,
});

const hdrEnhanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/hdr-enhance',
  component: HDREnhance,
});

const titleGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/title-generate',
  component: TitleGenerate,
});

const hookGenerateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai/hook-generate',
  component: HookGenerate,
});

// Coming Soon routes for remaining AI tools
const comingSoonRoutes = [
  '/ai/script-writer',
  '/ai/thumbnail-generate',
  '/ai/hashtag-generate',
  '/ai/description-generate',
  '/ai/seo-optimize',
  '/ai/trend-analyze',
  '/ai/audience-insights',
  '/ai/content-calendar',
  '/ai/ab-test',
  '/ai/viral-predict',
  '/ai/engagement-boost',
  '/ai/collab-finder',
  '/ai/monetize-tips',
  '/ai/deepfake-detect',
  '/ai/watermark-remove',
  '/ai/style-transfer',
  '/ai/face-swap',
  '/ai/age-transform',
  '/ai/gender-swap',
  '/ai/emotion-edit',
  '/ai/lip-sync',
  '/ai/voice-change',
  '/ai/noise-remove',
  '/ai/audio-enhance',
  '/ai/sound-effects',
  '/ai/3d-convert',
  '/ai/vr-convert',
  '/ai/360-convert',
  '/ai/slow-motion',
  '/ai/time-lapse',
  '/ai/stabilize',
  '/ai/color-grade',
  '/ai/green-screen',
].map((path) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <ComingSoon featureName={path.split('/').pop()?.replace(/-/g, ' ') || 'Feature'} />,
  })
);

const routeTree = rootRoute.addChildren([
  indexRoute,
  videoEditorRoute,
  photoEditorRoute,
  imageGeneratorRoute,
  videoGeneratorRoute,
  autoCutRoute,
  captionsRoute,
  backgroundRemoveRoute,
  beatSyncRoute,
  autoEnhanceRoute,
  autoUpscaleRoute,
  voiceCloneRoute,
  musicGenerateRoute,
  bRollGenerateRoute,
  logoGenerateRoute,
  stickerGenerateRoute,
  characterGenerateRoute,
  highlightDetectRoute,
  timelineAIRoute,
  motionAIRoute,
  hdrEnhanceRoute,
  titleGenerateRoute,
  hookGenerateRoute,
  ...comingSoonRoutes,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function Router() {
  return <RouterProvider router={router} />;
}
