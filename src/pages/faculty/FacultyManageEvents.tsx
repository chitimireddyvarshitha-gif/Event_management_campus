import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { EventStatusBadge } from '../../components/common/EventStatusBadge';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import {
  PlusCircle,
  Edit,
  Trash2,
  Users,
  Eye,
  CalendarDays,
  Sparkles,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react';

export const FacultyManageEvents: React.FC = () => {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, categoryFilter]);

  const eventToDelete = events.find((e) => e.id === deleteCandidateId);

  const handleConfirmDelete = async () => {
    if (deleteCandidateId) {
      await deleteEvent(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner with "Create New Event" */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1F3A] text-[#D4A72C] text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Event Management Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            Manage Campus Events
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Supervise scheduled collegiate events, adjust capacities, edit details, or review registered student rosters.
          </p>
        </div>

        <Link
          to="/faculty/events/add"
          className="px-5 py-3 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#D4A72C]" />
          <span>Create New Event</span>
        </Link>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white rounded-xl border border-[#0B1F3A]/8 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search event title or venue..."
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#64748B] flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#D4A72C]" />
            Category:
          </span>
          {['All', 'Technical', 'Cultural', 'Sports', 'Academic'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'bg-[#F7F8FA] text-[#64748B] hover:text-[#0B1F3A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Management Table */}
      {filteredEvents.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1F3A] text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Venue</th>
                  <th className="py-4 px-6 text-center">Capacity</th>
                  <th className="py-4 px-6 text-center">Registrations</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1F3A]/6 text-xs text-[#172033]">
                {filteredEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    className="hover:bg-[#D4A72C]/5 transition-colors group"
                  >
                    {/* Event Title */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#0B1F3A] text-sm block">
                        {evt.title}
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        ID: {evt.id} · {evt.organizer}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-[11px]">
                        {evt.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 whitespace-nowrap tabular-nums font-semibold text-[#0B1F3A]">
                      {evt.date}
                    </td>

                    {/* Venue */}
                    <td className="py-4 px-6 max-w-xs text-[#64748B]">
                      <div className="truncate">{evt.venue}</div>
                    </td>

                    {/* Capacity */}
                    <td className="py-4 px-6 text-center font-mono tabular-nums text-[#0B1F3A]">
                      {evt.capacity}
                    </td>

                    {/* Registrations */}
                    <td className="py-4 px-6 text-center">
                      <span className="font-mono font-bold text-[#0B1F3A] tabular-nums">
                        {evt.registeredCount}
                      </span>
                      <span className="text-[10px] text-[#64748B] block">
                        ({Math.round((evt.registeredCount / evt.capacity) * 100)}%)
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <EventStatusBadge status={evt.status} size="sm" />
                    </td>

                    {/* Actions: View, Edit, Delete, View Registrations */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* View Registrations */}
                        <Link
                          to={`/faculty/events/${evt.id}/registrations`}
                          className="p-1.5 text-[#0B1F3A] hover:bg-[#D4A72C]/20 rounded-lg transition-colors"
                          title="View Registered Students"
                        >
                          <Users className="w-4 h-4 text-[#0B1F3A]" />
                        </Link>

                        {/* View Public Event Page */}
                        <Link
                          to={`/student/events/${evt.id}`}
                          className="p-1.5 text-[#64748B] hover:text-[#0B1F3A] hover:bg-[#0B1F3A]/5 rounded-lg transition-colors"
                          title="View Public Event Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/faculty/events/edit/${evt.id}`}
                          className="p-1.5 text-[#64748B] hover:text-[#0B1F3A] hover:bg-[#0B1F3A]/5 rounded-lg transition-colors"
                          title="Edit Event Parameters"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteCandidateId(evt.id)}
                          className="p-1.5 text-[#C62828] hover:bg-[#C62828]/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No events match your criteria"
          description="Adjust your search query or create a new event record."
          iconType="search"
          actionLabel="Clear Search"
          onAction={() => {
            setSearchQuery('');
            setCategoryFilter('All');
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteCandidateId}
        onClose={() => setDeleteCandidateId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Event Record"
        message={`Are you sure you want to permanently delete "${eventToDelete?.title || 'this event'}"? This action cannot be undone and will void existing student registrations.`}
        confirmLabel="Delete Permanently"
        cancelLabel="Keep Event"
        isDestructive
      />
    </div>
  );
};
