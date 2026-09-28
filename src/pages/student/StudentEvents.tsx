import React, { useState, useMemo } from 'react';
import { useEvents } from '../../context/EventContext';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterPanel } from '../../components/common/FilterPanel';
import { EventCard } from '../../components/common/EventCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Compass, Sparkles } from 'lucide-react';

export const StudentEvents: React.FC = () => {
  const { events, isStudentRegistered } = useEvents();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVenue, setSelectedVenue] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Extract unique venues for filter dropdown
  const uniqueVenues = useMemo(() => {
    const venuesSet = new Set(events.map((e) => e.venue));
    return Array.from(venuesSet);
  }, [events]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Search matching
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;

      // Venue matching
      const matchesVenue = selectedVenue === 'All' || evt.venue === selectedVenue;

      // Status matching
      const matchesStatus = selectedStatus === 'All' || evt.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesVenue && matchesStatus;
    });
  }, [events, searchQuery, selectedCategory, selectedVenue, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedVenue('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Collegiate Events Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            Browse Campus Events
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Discover workshops, hackathons, sports championships, and cultural festivals across campus.
          </p>
        </div>

        {/* Search input in header */}
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events, venues, organizers..."
          />
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <FilterPanel
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedVenue={selectedVenue}
        onSelectVenue={setSelectedVenue}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        venues={uniqueVenues}
        onReset={handleResetFilters}
      />

      {/* Results Count & Current Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
        <span>
          Showing <strong className="text-[#0B1F3A] tabular-nums">{filteredEvents.length}</strong> events
          {selectedCategory !== 'All' && <span> in <strong className="text-[#0B1F3A]">{selectedCategory}</strong></span>}
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedVenue !== 'All' || selectedStatus !== 'All') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] underline decoration-[#D4A72C]"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard
              key={evt.id}
              event={evt}
              isRegistered={isStudentRegistered(evt.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events match your criteria"
          description="Try broadening your search term, resetting the category tabs, or checking all venues."
          iconType="search"
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};
