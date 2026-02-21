import { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileVideoEditor } from '../components/MobileVideoEditor';
import { DesktopVideoEditor } from '../components/DesktopVideoEditor';
import Toolbar from '../components/Toolbar';
import ProjectsModal from '../components/ProjectsModal';
import ExportModal from '../components/ExportModal';
import { ThreeBackground } from '../components/ThreeBackground';
import { NavbarDesktop } from '../components/NavbarDesktop';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { AIAssistant } from '../components/AIAssistant';

export default function VideoEditor() {
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <ThreeBackground />
        <NavbarDesktop />

        <div className="md:ml-64 relative z-10">
          <div className="bg-black/90 backdrop-blur-xl border-b border-white/10">
            <Toolbar
              onOpenProjects={() => setShowProjectsModal(true)}
              onOpenExport={() => setShowExportModal(true)}
            />
          </div>
          <DesktopVideoEditor />
        </div>

        <ProjectsModal open={showProjectsModal} onOpenChange={setShowProjectsModal} />
        <ExportModal open={showExportModal} onOpenChange={setShowExportModal} />
        <AIAssistant />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ThreeBackground />
      
      <div className="relative z-10">
        <div className="bg-black/90 backdrop-blur-xl border-b border-white/10">
          <Toolbar
            onOpenProjects={() => setShowProjectsModal(true)}
            onOpenExport={() => setShowExportModal(true)}
          />
        </div>
        <MobileVideoEditor />
      </div>

      <ProjectsModal open={showProjectsModal} onOpenChange={setShowProjectsModal} />
      <ExportModal open={showExportModal} onOpenChange={setShowExportModal} />
      <AIAssistant />
      <MobileBottomNav />
    </div>
  );
}
