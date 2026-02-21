import { useState } from 'react';
import Toolbar from '../components/Toolbar';
import Preview from '../components/Preview';
import Timeline from '../components/Timeline';
import Inspector from '../components/Inspector';
import ProjectsModal from '../components/ProjectsModal';
import ExportModal from '../components/ExportModal';
import { ThreeBackground } from '../components/ThreeBackground';
import { NavbarDesktop } from '../components/NavbarDesktop';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { AIAssistant } from '../components/AIAssistant';

export default function VideoEditor() {
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ThreeBackground />
      <NavbarDesktop />

      <div className="md:ml-64 relative z-10">
        <div className="h-screen flex flex-col">
          {/* Toolbar */}
          <div className="bg-black/90 backdrop-blur-xl border-b border-white/10">
            <Toolbar
              onOpenProjects={() => setShowProjectsModal(true)}
              onOpenExport={() => setShowExportModal(true)}
            />
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Preview Panel */}
            <div className="flex-1 bg-black/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/10 p-4">
              <Preview />
            </div>

            {/* Inspector Panel */}
            <div className="w-full lg:w-80 bg-black/80 backdrop-blur-xl border-b lg:border-b-0 border-white/10 overflow-y-auto">
              <Inspector />
            </div>
          </div>

          {/* Timeline */}
          <div className="h-48 bg-black/90 backdrop-blur-xl border-t border-white/10">
            <Timeline />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProjectsModal open={showProjectsModal} onOpenChange={setShowProjectsModal} />
      <ExportModal open={showExportModal} onOpenChange={setShowExportModal} />

      {/* AI Assistant */}
      <AIAssistant />

      <MobileBottomNav />
    </div>
  );
}
