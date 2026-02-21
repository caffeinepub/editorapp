import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProjectManager } from '../hooks/useProjectManager';
import { FolderOpen } from 'lucide-react';

type ProjectsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProjectsModal({ open, onOpenChange }: ProjectsModalProps) {
  const { projects, loadProjectById } = useProjectManager();

  const handleLoadProject = (projectData: string) => {
    loadProjectById(projectData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-teal-400">Load Project</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select a project to load
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {!projects ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No saved projects</p>
                <p className="text-xs mt-1">Create and save a project to see it here</p>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg bg-gray-800/50 border border-white/10 hover:border-teal-500/50 transition-colors cursor-pointer"
                  onClick={() => handleLoadProject(project.data)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm text-foreground">{project.id}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.data.length} characters
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:bg-teal-500/20 hover:border-teal-500"
                    >
                      Load
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
