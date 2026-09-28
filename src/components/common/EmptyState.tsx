import React from 'react';
import { CalendarX, SearchX, UserX, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  iconType?: 'events' | 'search' | 'registrations' | 'students' | 'general';
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  iconType = 'general',
  actionLabel,
  onAction,
}) => {
  let icon = <FolderOpen className="w-8 h-8 text-[#D4A72C]" />;
  if (iconType === 'events') {
    icon = <CalendarX className="w-8 h-8 text-[#D4A72C]" />;
  } else if (iconType === 'search') {
    icon = <SearchX className="w-8 h-8 text-[#D4A72C]" />;
  } else if (iconType === 'students') {
    icon = <UserX className="w-8 h-8 text-[#D4A72C]" />;
  }

  return (
    <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-12 text-center flex flex-col items-center justify-center my-6 shadow-xs max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A]/5 border border-[#0B1F3A]/8 flex items-center justify-center mb-4 text-[#D4A72C]">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[#0B1F3A] mb-1">{title}</h3>
      <p className="text-xs text-[#64748B] max-w-sm leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-5 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
