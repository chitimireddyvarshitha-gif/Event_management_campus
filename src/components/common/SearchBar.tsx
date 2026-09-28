import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search events...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#0B1F3A]/15 rounded-lg text-sm text-[#172033] placeholder:text-[#64748B]/70 focus:outline-none focus:border-[#D4A72C] focus:ring-2 focus:ring-[#D4A72C]/20 transition-all shadow-xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 p-0.5 text-[#64748B] hover:text-[#0B1F3A] rounded transition-colors"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
