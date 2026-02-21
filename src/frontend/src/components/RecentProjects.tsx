import { Clock } from 'lucide-react';
import { useProjectManager } from '../hooks/useProjectManager';
import { useNavigate } from '@tanstack/react-router';
import { formatDistanceToNow } from 'date-fns';

export function RecentProjects() {
  const { projects, loadProjectById } = useProjectManager();
  const navigate = useNavigate();

  const handleProjectClick = (projectData: string) => {
    loadProjectById(projectData);
    navigate({ to: '/editor/video' });
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/10">
        <p className="text-white/50 text-sm">No recent projects</p>
      </div>
    );
  }

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
      {projects.map((project) => {
        const timestamp = project.id.split('-')[1];
        const date = timestamp ? new Date(parseInt(timestamp)) : new Date();
        
        return (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.data)}
            className="min-w-[200px] h-32 bg-white/10 rounded-xl backdrop-blur-xl p-4 border border-white/5 hover:bg-white/15 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span className="text-xs text-white/60">
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
            </div>
            <h4 className="text-white font-semibold group-hover:text-teal-400 transition-colors truncate">
              {project.id}
            </h4>
            <p className="text-xs text-white/50 mt-1">Video Project</p>
          </div>
        );
      })}
    </div>
  );
}
