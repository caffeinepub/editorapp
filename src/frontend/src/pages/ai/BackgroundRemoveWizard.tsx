import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Upload, MousePointer, Loader2, Brush, Eraser } from 'lucide-react';
import { ThreeBackground } from '../../components/ThreeBackground';
import { NavbarDesktop } from '../../components/NavbarDesktop';
import { MobileBottomNav } from '../../components/MobileBottomNav';

export default function BackgroundRemoveWizard() {
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [progress, setProgress] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      setStep(3);
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 300);
    } else {
      setStep(step + 1);
    }
  };

  const isNextDisabled = step === 1 && !videoFile;

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ThreeBackground />
      <NavbarDesktop />

      <div className="md:ml-64 relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate({ to: '/' })}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Background Remover</h1>
            <div className="ml-auto text-sm text-white/60">Step {step} of 3</div>
          </div>
        </header>

        {/* Wizard Content */}
        <main className="flex-1 flex items-center justify-center p-6 pb-24 md:pb-6">
          <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === step ? 'w-12 bg-orange-400' : s < step ? 'w-8 bg-orange-600' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center space-y-6">
              {step === 1 && (
                <>
                  <Upload className="w-16 h-16 text-orange-400 mx-auto" />
                  <h2 className="text-2xl font-bold">Upload your video</h2>
                  <p className="text-white/60">
                    Select a video to remove the background
                  </p>
                  <label className="mt-8 block p-12 border-2 border-dashed border-white/20 rounded-xl hover:border-orange-400/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-white/60">
                      {videoFile ? videoFile.name : 'Click to browse or drag and drop'}
                    </p>
                  </label>
                </>
              )}

              {step === 2 && (
                <>
                  <MousePointer className="w-16 h-16 text-red-400 mx-auto" />
                  <h2 className="text-2xl font-bold">Select areas</h2>
                  <p className="text-white/60">
                    Choose which parts to keep or remove
                  </p>
                  
                  {/* Tool Selection */}
                  <div className="flex gap-4 justify-center mb-4">
                    <button
                      onClick={() => setTool('brush')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        tool === 'brush'
                          ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-green-500/30'
                      }`}
                    >
                      <Brush className="w-4 h-4" />
                      Keep
                    </button>
                    <button
                      onClick={() => setTool('eraser')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        tool === 'eraser'
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-red-500/30'
                      }`}
                    >
                      <Eraser className="w-4 h-4" />
                      Remove
                    </button>
                  </div>

                  {/* Canvas Preview */}
                  <div className="mt-8 aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                    />
                    <p className="text-white/40 relative z-10">Video preview with selection tools</p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  {progress < 100 ? (
                    <>
                      <Loader2 className="w-16 h-16 text-orange-400 mx-auto animate-spin" />
                      <h2 className="text-2xl font-bold">Processing…</h2>
                      <p className="text-white/60">
                        AI is removing the background from your video
                      </p>
                      <div className="mt-8 space-y-2">
                        <div className="bg-white/5 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-white/60">{progress}% complete</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">Preview Result</h2>
                      <p className="text-white/60">
                        Drag the slider to compare before and after
                      </p>
                      <div className="mt-8 aspect-video bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 flex">
                          <div
                            className="bg-gradient-to-br from-blue-500 to-purple-500"
                            style={{ width: `${sliderPosition}%` }}
                          />
                          <div
                            className="bg-gradient-to-br from-green-500 to-teal-500"
                            style={{ width: `${100 - sliderPosition}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderPosition}
                          onChange={(e) => setSliderPosition(Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                        />
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                          style={{ left: `${sliderPosition}%` }}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && step < 3 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => progress >= 100 ? navigate({ to: '/editor/video' }) : handleNext()}
                disabled={isNextDisabled}
                className={`flex-1 px-6 py-3 rounded-xl transition-colors font-semibold ${
                  isNextDisabled
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                }`}
              >
                {progress >= 100 ? 'Apply to Editor' : step === 3 ? 'Processing...' : 'Next'}
              </button>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
