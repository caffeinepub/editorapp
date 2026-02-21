import { Link, useLocation } from '@tanstack/react-router';
import { Video, Sparkles, Layout, Folder, User } from 'lucide-react';

export function NavbarDesktop() {
  const location = useLocation();

  const navItems = [
    { name: 'Create', path: '/', icon: Video },
    { name: 'Templates', path: '/templates/trending', icon: Layout },
    { name: 'AI Tools', path: '/ai/auto-cut', icon: Sparkles },
    { name: 'Projects', path: '/projects/recent', icon: Folder },
    { name: 'Account', path: '/account/profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-primary flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-primary bg-clip-text text-transparent">
            Video Studio
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path.split('/')[1]));
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500/20 to-primary/20 text-teal-400 border border-teal-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-white/50">
        <p>© {new Date().getFullYear()}</p>
        <p className="mt-1">
          Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}
