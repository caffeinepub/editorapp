import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ThreeBackground } from '../components/ThreeBackground';
import { SearchBar } from '../components/SearchBar';
import { RecentProjects } from '../components/RecentProjects';
import { HomeOptionCard } from '../components/HomeOptionCard';
import { AIToolCard } from '../components/AIToolCard';
import { TemplateCard } from '../components/TemplateCard';
import { NavbarDesktop } from '../components/NavbarDesktop';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { homeSections } from '../data/homeSections';
import { templates } from '../data/templates';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { AICategory } from '../types/aiJob';

export default function Home() {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    generation: true,
    editing: true,
    enhancement: true,
    creator: true,
    assistant: true,
    growth: true,
    experimental: true,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Group AI tools by category
  const groupedAITools = useMemo(() => {
    const groups: Record<string, typeof homeSections.aiTools> = {};
    homeSections.aiTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, []);

  const categoryColors: Record<string, string> = {
    generation: 'from-purple-500/20 to-purple-900/20 border-purple-500/30',
    editing: 'from-blue-500/20 to-blue-900/20 border-blue-500/30',
    enhancement: 'from-green-500/20 to-green-900/20 border-green-500/30',
    creator: 'from-orange-500/20 to-orange-900/20 border-orange-500/30',
    assistant: 'from-cyan-500/20 to-cyan-900/20 border-cyan-500/30',
    growth: 'from-pink-500/20 to-pink-900/20 border-pink-500/30',
    experimental: 'from-red-500/20 to-red-900/20 border-red-500/30',
  };

  const categoryLabels: Record<string, string> = {
    generation: 'Generation',
    editing: 'Editing',
    enhancement: 'Enhancement',
    creator: 'Creator',
    assistant: 'Assistant',
    growth: 'Growth',
    experimental: 'Experimental',
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ThreeBackground />
      <NavbarDesktop />

      <div className="md:ml-64 relative z-10">
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Search Bar */}
          <SearchBar />

          {/* Recent Projects */}
          <RecentProjects />

          {/* Create Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Create
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <HomeOptionCard
                name="Video Edit"
                route="/editor/video"
              />
              <HomeOptionCard
                name="Photo Edit"
                route="/editor/photo"
              />
              <HomeOptionCard
                name="AI Generate"
                route="/ai/image-generator"
              />
            </div>
          </section>

          {/* AI Tools Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Tools
            </h2>
            <div className="space-y-6">
              {Object.entries(groupedAITools).map(([category, tools]) => (
                <div key={category} className="space-y-4">
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${
                      categoryColors[category] || 'from-gray-500/20 to-gray-900/20 border-gray-500/30'
                    } border backdrop-blur-xl transition-all hover:scale-[1.02]`}
                  >
                    <h3 className="text-xl font-bold text-white">{categoryLabels[category] || category}</h3>
                    {expandedCategories[category] ? (
                      <ChevronUp className="h-6 w-6 text-white" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-white" />
                    )}
                  </button>
                  {expandedCategories[category] && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {tools.map((tool) => (
                        <AIToolCard
                          key={tool.name}
                          name={tool.name}
                          description={tool.description}
                          icon={tool.icon}
                          route={tool.route}
                          category={tool.category as AICategory}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Templates Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  category={template.category}
                  duration={template.duration}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <MobileBottomNav />

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8 md:ml-64">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ultimate Editor. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
