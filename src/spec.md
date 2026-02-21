# Specification

## Summary
**Goal:** Build complete responsive video and photo editors with mobile and desktop layouts that adapt based on screen size.

**Planned changes:**
- Create useMediaQuery hook for responsive breakpoint detection
- Build VideoEditor page that renders MobileVideoEditor or DesktopVideoEditor based on screen width
- Implement MobileVideoEditor with CapCut-inspired vertical layout (VideoPlayer, Timeline, touch-optimized Toolbar)
- Implement DesktopVideoEditor with After Effects-inspired horizontal layout (menu bar, Preview, side panels, Timeline)
- Create VideoPlayer component with play/pause controls and time tracking
- Update Preview component to support mobile mode using VideoPlayer or desktop mode using WebGL rendering
- Create photoEditorStore for photo editing state management
- Build PhotoEditor page that renders MobilePhotoEditor or DesktopPhotoEditor based on screen width
- Implement MobilePhotoEditor with vertical layout (PhotoCanvas, filter toolbar, upload)
- Implement DesktopPhotoEditor with horizontal layout (menu bar, PhotoCanvas, FiltersPanel, StickersPanel)
- Create PhotoCanvas component with HTML5 canvas and CSS filter support
- Create FiltersPanel component with range sliders for brightness, contrast, saturation, and blur
- Create StickersPanel component with emoji sticker grid
- Update Router.tsx to add /editor/video and /editor/photo routes
- Update Home page to navigate Photo Edit card to /editor/photo
- Apply consistent glassmorphism styling across all editor components

**User-visible outcome:** Users can access fully responsive video and photo editors that automatically adapt between mobile-optimized and desktop-optimized layouts, with all editing features accessible on both screen sizes.
