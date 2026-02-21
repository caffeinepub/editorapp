import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'Templates', 'AI Tools', 'Quick Tools'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center bg-white/10 rounded-xl p-3 backdrop-blur-xl border border-white/5">
      <Search className="w-5 h-5 text-white/70 mr-3" />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search templates, tools, AI…"
        className="bg-transparent outline-none text-white flex-1 placeholder:text-white/50"
      />
      {searchText && (
        <button
          onClick={() => setSearchText('')}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      )}
      <div className="relative ml-3" ref={dropdownRef}>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white/5"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm">{selectedFilter}</span>
        </button>
        {filterOpen && (
          <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden min-w-[150px] shadow-xl">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedFilter(filter);
                  setFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-2 transition-colors ${
                  selectedFilter === filter
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
