import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  subtext?: string;
  trend?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon,
  subtext,
  trend,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#0B1F3A]/8 p-5 shadow-xs hover:border-[#D4A72C]/40 transition-all duration-200 group">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
            {label}
          </p>
          <div className="text-3xl font-extrabold text-[#0B1F3A] tabular-nums tracking-tight">
            {value}
          </div>
          {subtext && (
            <p className="text-xs text-[#64748B] mt-1.5 flex items-center gap-1.5">
              {trend && <span className="text-[#198754] font-semibold">{trend}</span>}
              <span>{subtext}</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-[#0B1F3A]/5 group-hover:bg-[#D4A72C]/15 border border-[#0B1F3A]/5 group-hover:border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] transition-colors shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
};
