import { Link, useLocation } from '@tanstack/react-router';
import { Video, Layout, Sparkles, Folder } from 'lucide-react';

export function MobileBottomNav() {
  const location = useLocation();

  const tabs = [
    { name: 'Create', path: '/', icon: Video },
    { name: 'Templates', path: '/templates/trending', icon: Layout },
    { name: 'AI', path: '/ai/auto-cut', icon: Sparkles },
    { name: 'Projects', path: '/projects/recent', icon: Folder },
  ];

  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path || 
                          (tab.path !== '/' && location.pathname.startsWith(tab.path.split('/')[1]));
          
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                isActive ? 'text-teal-400' : 'text-white/60'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
