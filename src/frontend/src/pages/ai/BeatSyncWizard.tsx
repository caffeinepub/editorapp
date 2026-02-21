import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Upload, Music, Loader2 } from 'lucide-react';
import { ThreeBackground } from '../../components/ThreeBackground';
import { NavbarDesktop } from '../../components/NavbarDesktop';
import { MobileBottomNav } from '../../components/MobileBottomNav';

export default function BeatSyncWizard() {
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [bpm, setBpm] = useState(128);
  const [intensity, setIntensity] = useState<'subtle' | 'moderate' | 'aggressive'>('moderate');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
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

  const isNextDisabled = step === 1 && (!videoFile || !audioFile);

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
            <h1 className="text-2xl font-bold">Beat Sync</h1>
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
                    s === step ? 'w-12 bg-green-400' : s < step ? 'w-8 bg-green-600' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center space-y-6">
              {step === 1 && (
                <>
                  <Upload className="w-16 h-16 text-green-400 mx-auto" />
                  <h2 className="text-2xl font-bold">Upload video and audio</h2>
                  <p className="text-white/60">
                    Select your video and music track
                  </p>
                  <div className="space-y-4 mt-8">
                    <label className="block p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-green-400/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <p className="text-white/60">
                        {videoFile ? `Video: ${videoFile.name}` : 'Upload video'}
                      </p>
                    </label>
                    <label className="block p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-green-400/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                      <p className="text-white/60">
                        {audioFile ? `Audio: ${audioFile.name}` : 'Upload audio track'}
                      </p>
                    </label>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <Music className="w-16 h-16 text-emerald-400 mx-auto" />
                  <h2 className="text-2xl font-bold">Detect beats</h2>
                  <p className="text-white/60">
                    AI is analyzing the music rhythm
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <span className="text-sm">BPM Detected</span>
                      <span className="font-bold text-green-400">{bpm}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <span className="text-sm">Beats Found</span>
                      <span className="font-bold text-green-400">247</span>
                    </div>
                    
                    {/* BPM Adjustment */}
                    <div className="text-left">
                      <label className="block text-sm text-white/60 mb-2">Adjust BPM</label>
                      <input
                        type="range"
                        min="60"
                        max="200"
                        value={bpm}
                        onChange={(e) => setBpm(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Beat Visualizer */}
                    <div className="h-20 bg-white/5 rounded-lg flex items-center justify-center gap-1 px-4">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-green-400/50 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 60 + 20}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Sync Intensity */}
                    <div className="text-left">
                      <label className="block text-sm text-white/60 mb-2">Sync Intensity</label>
                      <div className="flex gap-2">
                        {(['subtle', 'moderate', 'aggressive'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setIntensity(level)}
                            className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                              intensity === level
                                ? 'bg-green-500/20 border-green-400/50 text-green-400'
                                : 'bg-white/5 border-white/10 text-white/70 hover:border-green-400/30'
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <Loader2 className="w-16 h-16 text-green-400 mx-auto animate-spin" />
                  <h2 className="text-2xl font-bold">Syncing…</h2>
                  <p className="text-white/60">
                    Synchronizing video cuts to music beats
                  </p>
                  <div className="mt-8 space-y-2">
                    <div className="bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-white/60">{progress}% complete</p>
                  </div>
                  {progress >= 100 && (
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-sm text-green-400">✓ Beat sync complete!</p>
                    </div>
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
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
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
