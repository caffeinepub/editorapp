import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Upload, Palette, Loader2, Check } from 'lucide-react';
import { ThreeBackground } from '../../components/ThreeBackground';
import { NavbarDesktop } from '../../components/NavbarDesktop';
import { MobileBottomNav } from '../../components/MobileBottomNav';

export default function AutoCutWizard() {
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const styles = [
    { name: 'Dynamic', description: 'Fast cuts with energy' },
    { name: 'Smooth', description: 'Gentle transitions' },
    { name: 'Energetic', description: 'High-tempo editing' },
    { name: 'Minimal', description: 'Clean and simple' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      // Simulate processing
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

  const isNextDisabled = (step === 1 && !videoFile) || (step === 2 && !selectedStyle);

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
            <h1 className="text-2xl font-bold">Auto Cut</h1>
            <div className="ml-auto text-sm text-white/60">Step {step} of 3</div>
          </div>
        </header>

        {/* Wizard Content */}
        <main className="flex-1 flex items-center justify-center p-6 pb-24 md:pb-6">
          <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === step ? 'w-12 bg-teal-400' : s < step ? 'w-8 bg-teal-600' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center space-y-6">
              {step === 1 && (
                <>
                  <Upload className="w-16 h-16 text-teal-400 mx-auto" />
                  <h2 className="text-2xl font-bold">Upload your video</h2>
                  <p className="text-white/60">
                    Select a video file to automatically cut and edit
                  </p>
                  <label className="mt-8 block p-12 border-2 border-dashed border-white/20 rounded-xl hover:border-teal-400/50 transition-colors cursor-pointer">
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
                  <Palette className="w-16 h-16 text-purple-400 mx-auto" />
                  <h2 className="text-2xl font-bold">Select style</h2>
                  <p className="text-white/60">
                    Choose an editing style for your video
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {styles.map((style) => (
                      <div
                        key={style.name}
                        onClick={() => setSelectedStyle(style.name)}
                        className={`p-6 rounded-xl border transition-all cursor-pointer ${
                          selectedStyle === style.name
                            ? 'bg-purple-500/20 border-purple-400/50'
                            : 'bg-white/5 border-white/10 hover:border-purple-400/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{style.name}</h3>
                          {selectedStyle === style.name && (
                            <Check className="w-5 h-5 text-purple-400" />
                          )}
                        </div>
                        <p className="text-xs text-white/60">{style.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <Loader2 className="w-16 h-16 text-blue-400 mx-auto animate-spin" />
                  <h2 className="text-2xl font-bold">Processing…</h2>
                  <p className="text-white/60">
                    AI is analyzing and cutting your video
                  </p>
                  <div className="mt-8 space-y-2">
                    <div className="bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-white/60">{progress}% complete</p>
                  </div>
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
                    : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
                }`}
              >
                {progress >= 100 ? 'Open in Editor' : step === 3 ? 'Processing...' : 'Next'}
              </button>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
