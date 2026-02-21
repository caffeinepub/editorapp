import { useEditorStore } from '../store/editorStore';
import { useMutation, useQuery } from '@tanstack/react-query';

interface Project {
  id: string;
  data: string;
  timestamp: number;
}

// Use localStorage for project management since backend no longer supports it
const PROJECTS_KEY = 'video-editor-projects';

function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load projects from localStorage:', error);
    return [];
  }
}

function saveProjectToStorage(projectId: string, projectData: string): void {
  try {
    const projects = getProjects();
    const existingIndex = projects.findIndex(p => p.id === projectId);
    
    const project: Project = {
      id: projectId,
      data: projectData,
      timestamp: Date.now(),
    };

    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }

    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save project to localStorage:', error);
    throw error;
  }
}

export function useProjectManager() {
  const { tracks, duration, fps, resolution, loadProject } = useEditorStore();

  const saveProject = useMutation({
    mutationFn: async () => {
      // Flatten tracks to clips for storage
      const clips = tracks.flatMap(track => track.clips);
      const projectData = JSON.stringify({ 
        clips, 
        duration,
        fps,
        resolution
      });
      const projectId = `project-${Date.now()}`;
      
      saveProjectToStorage(projectId, projectData);
      return projectId;
    }
  });

  const { data: projects, refetch: refetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      return getProjects();
    },
  });

  const loadProjectById = (projectData: string) => {
    try {
      const parsed = JSON.parse(projectData);
      loadProject(
        parsed.clips || [], 
        parsed.duration || 30,
        parsed.fps || 30,
        parsed.resolution || [1920, 1080]
      );
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  };

  return {
    saveProject,
    projects,
    refetchProjects,
    loadProjectById
  };
}
