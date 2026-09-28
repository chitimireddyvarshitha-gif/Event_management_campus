import React from 'react';
import { EventCategory, EventStatus } from '../../types';
import { Filter, Calendar, MapPin, CheckCircle, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedVenue: string;
  onSelectVenue: (venue: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  venues: string[];
  onReset: () => void;
}

export const CATEGORIES: (EventCategory | 'All')[] = [
  'All',
  'Technical',
  'Cultural',
  'Sports',
  'Academic',
  'Other'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedVenue,
  onSelectVenue,
  selectedStatus,
  onSelectStatus,
  venues,
  onReset,
}) => {
  const isFiltered = selectedCategory !== 'All' || selectedVenue !== 'All' || selectedStatus !== 'All';

  return (
    <div className="bg-white rounded-xl border border-[#0B1F3A]/8 p-4 mb-6 shadow-xs">
      <div className="flex flex-col gap-4">
        {/* Category Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-[#0B1F3A]/8 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#D4A72C]" />
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0B1F3A] text-white shadow-xs'
                    : 'bg-[#F7F8FA] text-[#64748B] hover:text-[#0B1F3A] hover:bg-[#0B1F3A]/5'
                }`}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Dropdowns: Venue, Status, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            {/* Venue Dropdown */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4A72C]" />
              <select
                value={selectedVenue}
                onChange={(e) => onSelectVenue(e.target.value)}
                aria-label="Filter by venue"
                className="bg-[#F7F8FA] border border-[#0B1F3A]/15 text-[#172033] text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#D4A72C] transition-colors"
              >
                <option value="All">All Campus Venues</option>
                {venues.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A72C]" />
              <select
                value={selectedStatus}
                onChange={(e) => onSelectStatus(e.target.value)}
                aria-label="Filter by status"
                className="bg-[#F7F8FA] border border-[#0B1F3A]/15 text-[#172033] text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#D4A72C] transition-colors"
              >
                <option value="All">All Event Statuses</option>
                <option value="Registration Open">Registration Open</option>
                <option value="Event Full">Event Full</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Reset button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
