import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { EventStatusBadge } from '../../components/common/EventStatusBadge';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { EmptyState } from '../../components/common/EmptyState';
import {
  BookmarkCheck,
  Calendar,
  Clock,
  MapPin,
  XCircle,
  ExternalLink,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const StudentRegistrations: React.FC = () => {
  const { studentRegistrations, cancelRegistration, events } = useEvents();

  const [selectedRegId, setSelectedRegId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredRegistrations = studentRegistrations.filter((r) => {
    if (filterStatus === 'All') return true;
    return r.status === filterStatus;
  });

  const handleConfirmCancel = async () => {
    if (selectedRegId) {
      await cancelRegistration(selectedRegId);
      setSelectedRegId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider mb-2">
            <BookmarkCheck className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Enrollment Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            My Event Registrations
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Manage your registered participation slots, venue passes, and cancellation requests.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/10 self-start sm:self-auto">
          {['All', 'Registered', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0B1F3A]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Registrations List / Table */}
      {filteredRegistrations.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 shadow-xs overflow-hidden">
          
          {/* Responsive Table for Desktop & Tablet */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1F3A] text-white text-[11px] font-bold uppercase tracking-wider border-b border-[#0B1F3A]/20">
                  <th className="py-4 px-6">Event Details</th>
                  <th className="py-4 px-6">Event Date & Time</th>
                  <th className="py-4 px-6">Venue</th>
                  <th className="py-4 px-6">Enrolled On</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1F3A]/6 text-xs text-[#172033]">
                {filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-[#D4A72C]/5 transition-colors group"
                  >
                    {/* Event Title */}
                    <td className="py-4 px-6">
                      <Link
                        to={`/student/events/${reg.eventId}`}
                        className="font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors block text-sm group-hover:underline"
                      >
                        {reg.eventTitle}
                      </Link>
                      <span className="text-[11px] text-[#64748B]">
                        Reg ID: {reg.id}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-[#0B1F3A] font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" />
                        <span>{reg.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#64748B] mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{reg.eventTime}</span>
                      </div>
                    </td>

                    {/* Venue */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-[#64748B] max-w-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                        <span className="truncate">{reg.eventVenue}</span>
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="py-4 px-6 tabular-nums text-[#64748B] whitespace-nowrap">
                      {reg.registrationDate}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <EventStatusBadge status={reg.status} size="sm" />
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/student/events/${reg.eventId}`}
                          className="p-1.5 text-[#0B1F3A] hover:text-[#D4A72C] hover:bg-[#0B1F3A]/5 rounded-lg transition-colors"
                          title="View Event Details"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {reg.status === 'Registered' && (
                          <button
                            type="button"
                            onClick={() => setSelectedRegId(reg.id)}
                            className="px-3 py-1.5 text-xs font-bold text-[#C62828] hover:bg-[#C62828] hover:text-white rounded-lg border border-[#C62828]/25 transition-all cursor-pointer"
                          >
                            Cancel Registration
                          </button>
                        )}
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
          title="You have not registered for any events yet"
          description="Browse through the university calendar to sign up for technical hackathons, cultural showcases, or athletics championships."
          iconType="registrations"
          actionLabel="Browse Campus Events"
          onAction={() => (window.location.href = '/student/events')}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!selectedRegId}
        onClose={() => setSelectedRegId(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Registration"
        message="Are you sure you want to cancel your registration? Your reserved seat will be relinquished immediately."
        confirmLabel="Confirm Cancellation"
        cancelLabel="Keep Reservation"
        isDestructive
      />
    </div>
  );
};
