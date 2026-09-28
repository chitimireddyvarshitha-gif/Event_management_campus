import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { registrationService } from '../../services/registrationService';
import { EventRegistration } from '../../types';
import { EventStatusBadge } from '../../components/common/EventStatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import {
  ArrowLeft,
  Users,
  Download,
  Calendar,
  MapPin,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const FacultyRegisteredStudents: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();

  const event = id ? getEventById(id) : undefined;
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEventRegistrations = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await registrationService.getEventRegistrations(id, event?.title);
        setRegistrations(data);
      } catch (e) {
        console.error('Failed to load registered students', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventRegistrations();
  }, [id, event]);

  const availableSeats = event ? Math.max(0, event.capacity - event.registeredCount) : 0;
  const fillRate = event && event.capacity > 0 ? Math.round((event.registeredCount / event.capacity) * 100) : 0;

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      return (
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.studentPhone.includes(searchQuery)
      );
    });
  }, [registrations, searchQuery]);

  const handleExportCSV = () => {
    const headers = ['Student Name', 'Email', 'Phone', 'Registration Date', 'Status'];
    const rows = filteredRegistrations.map((r) => [
      `"${r.studentName}"`,
      `"${r.studentEmail}"`,
      `"${r.studentPhone}"`,
      `"${r.registrationDate}"`,
      `"${r.status}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${event?.title.replace(/\s+/g, '_')}_Student_Roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!event) {
    return (
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-12 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#0B1F3A]">Event Record Not Found</h2>
        <p className="text-xs text-[#64748B] mt-2 mb-6">
          The requested event could not be located in university databases.
        </p>
        <Link
          to="/faculty/events"
          className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#071426] transition-colors"
        >
          Back to Events Roster
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Back to Events button */}
      <div className="flex items-center justify-between">
        <Link
          to="/faculty/events"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Roster</span>
        </Link>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#0B1F3A]/20 bg-white hover:bg-[#0B1F3A] hover:text-white text-xs font-bold text-[#0B1F3A] transition-colors shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#D4A72C]" />
          <span>Export Student Roster (CSV)</span>
        </button>
      </div>

      {/* Top Event Metric Header Card */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-[#0B1F3A]/8 text-[#0B1F3A] font-bold text-[11px] uppercase tracking-wider">
                {event.category}
              </span>
              <EventStatusBadge status={event.status} size="sm" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{event.date}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{event.time}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{event.venue}</span>
              </span>
            </div>
          </div>

          {/* Key Metric Blocks: Event Name, Total Capacity, Total Registered, Available Seats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
            <div className="p-3.5 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                Total Capacity
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tabular-nums font-mono">
                {event.capacity}
              </span>
            </div>

            <div className="p-3.5 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                Total Registered
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tabular-nums font-mono">
                {event.registeredCount}
              </span>
            </div>

            <div className="p-3.5 bg-[#D4A72C]/15 rounded-xl border border-[#D4A72C]/30 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] block">
                Available Seats
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tabular-nums font-mono">
                {availableSeats}
              </span>
            </div>
          </div>

        </div>

        {/* Capacity Occupancy Bar */}
        <div className="mt-6 pt-5 border-t border-[#0B1F3A]/8">
          <div className="flex items-center justify-between text-xs font-semibold text-[#0B1F3A] mb-1.5">
            <span>Seat Occupancy Progress</span>
            <span className="tabular-nums font-bold text-[#D4A72C]">{fillRate}% Filled</span>
          </div>
          <div className="w-full bg-[#0B1F3A]/8 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                fillRate >= 100
                  ? 'bg-[#C62828]'
                  : fillRate > 80
                  ? 'bg-[#D4A72C]'
                  : 'bg-[#0B1F3A]'
              }`}
              style={{ width: `${Math.min(100, fillRate)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Student Roster Filter & Table */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 shadow-xs overflow-hidden">
        
        <div className="p-6 border-b border-[#0B1F3A]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D4A72C]" />
              <span>Registered Student Roll</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Confirmed attendee registry for campus check-in and certificate issuance.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search student or email..."
            />
          </div>
        </div>

        {/* Table */}
        {filteredRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1F3A] text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Official Email</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">Registration Date</th>
                  <th className="py-4 px-6">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1F3A]/6 text-xs text-[#172033]">
                {filteredRegistrations.map((reg, index) => (
                  <tr
                    key={reg.id || index}
                    className="hover:bg-[#D4A72C]/5 transition-colors group"
                  >
                    <td className="py-4 px-6 font-bold text-[#0B1F3A]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0B1F3A]/8 text-[#0B1F3A] flex items-center justify-center font-bold text-xs uppercase">
                          {reg.studentName.charAt(0)}
                        </div>
                        <span>{reg.studentName}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{reg.studentEmail}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 tabular-nums text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{reg.studentPhone}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 tabular-nums text-[#64748B] whitespace-nowrap">
                      {reg.registrationDate}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <EventStatusBadge status={reg.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No students found"
            description={
              searchQuery
                ? 'No registered students matched your search query.'
                : 'No students have registered for this event yet.'
            }
            iconType="students"
            actionLabel={searchQuery ? 'Clear Search' : undefined}
            onAction={searchQuery ? () => setSearchQuery('') : undefined}
          />
        )}

      </div>

    </div>
  );
};
