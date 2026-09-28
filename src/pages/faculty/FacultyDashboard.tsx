import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { StatsCard } from '../../components/common/StatsCard';
import { EventStatusBadge } from '../../components/common/EventStatusBadge';
import {
  CalendarDays,
  Users2,
  CheckCircle,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Eye,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { events } = useEvents();
  const navigate = useNavigate();

  // Statistics
  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => e.status === 'Registration Open' || e.status === 'Upcoming').length;
  const totalRegistrations = events.reduce((sum, e) => sum + (e.registeredCount || 0), 0);
  const completedEvents = events.filter((e) => e.status === 'Completed').length;

  // Recent 5 events for overview table
  const recentEvents = useMemo(() => {
    return [...events].slice(0, 5);
  }, [events]);

  // Category summary calculations for registration breakdown
  const categorySummary = useMemo(() => {
    const map: Record<string, { count: number; registrations: number; capacity: number }> = {};
    events.forEach((evt) => {
      if (!map[evt.category]) {
        map[evt.category] = { count: 0, registrations: 0, capacity: 0 };
      }
      map[evt.category].count += 1;
      map[evt.category].registrations += evt.registeredCount || 0;
      map[evt.category].capacity += evt.capacity;
    });
    return Object.entries(map).map(([category, data]) => ({
      category,
      ...data,
      fillRate: data.capacity > 0 ? Math.round((data.registrations / data.capacity) * 100) : 0,
    }));
  }, [events]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Welcome Section & Quick Administrative Actions */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1F3A] text-[#D4A72C] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Institutional Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            Welcome, Faculty Coordinator
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-xl">
            Manage your campus events and monitor student participation across all collegiate auditoriums and sports complexes.
          </p>
        </div>

        {/* Quick Actions (Add New Event, Manage Events, View Registrations) */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/faculty/events/add"
            className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#D4A72C]" />
            <span>Add New Event</span>
          </Link>
          <Link
            to="/faculty/events"
            className="px-4 py-2.5 rounded-xl border border-[#0B1F3A]/20 hover:border-[#D4A72C] text-[#0B1F3A] hover:bg-[#D4A72C]/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-[#D4A72C]" />
            <span>Manage Events</span>
          </Link>
          <button
            type="button"
            onClick={() => navigate('/faculty/events')}
            className="px-4 py-2.5 rounded-xl border border-[#0B1F3A]/20 hover:border-[#D4A72C] text-[#0B1F3A] hover:bg-[#D4A72C]/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users2 className="w-4 h-4 text-[#D4A72C]" />
            <span>View Registrations</span>
          </button>
        </div>
      </div>

      {/* 2. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          label="Total Events"
          value={totalEvents}
          icon={<Layers className="w-6 h-6" />}
          subtext="Institutional roster"
        />
        <StatsCard
          label="Upcoming Events"
          value={upcomingEvents}
          icon={<CalendarDays className="w-6 h-6" />}
          subtext="Scheduled this term"
        />
        <StatsCard
          label="Total Registrations"
          value={totalRegistrations.toLocaleString()}
          icon={<Users2 className="w-6 h-6" />}
          subtext="Students actively enrolled"
        />
        <StatsCard
          label="Completed Events"
          value={completedEvents}
          icon={<CheckCircle className="w-6 h-6" />}
          subtext="Concluded & archived"
        />
      </div>

      {/* 3. Registration Overview: Visual Summary of Registrations */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0B1F3A]/8 pb-4">
          <div>
            <h2 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#D4A72C]" />
              <span>Registration Overview & Category Fill Rates</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Real-time student seat distribution against maximum authorized auditorium limits.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1F3A]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C]" />
            <span>Enrolled Students vs Capacity</span>
          </div>
        </div>

        {/* Visual Progress Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorySummary.map((item) => (
            <div
              key={item.category}
              className="p-4 rounded-xl bg-[#F7F8FA] border border-[#0B1F3A]/6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-[#D4A72C] tabular-nums">
                  {item.fillRate}% Capacity
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#0B1F3A]/10 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0B1F3A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, item.fillRate)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                <span>
                  <strong className="text-[#0B1F3A] tabular-nums font-semibold">{item.registrations}</strong> registered
                </span>
                <span>
                  cap: <strong className="text-[#0B1F3A] tabular-nums">{item.capacity}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Event Overview Table */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 shadow-xs overflow-hidden">
        
        <div className="p-6 border-b border-[#0B1F3A]/8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0B1F3A]">
              Event Overview & Seat Allocation
            </h2>
            <p className="text-xs text-[#64748B]">
              Primary roster of departmental events actively supervised.
            </p>
          </div>
          <Link
            to="/faculty/events"
            className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] flex items-center gap-1 transition-colors"
          >
            <span>View Full Roster ({events.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B1F3A] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Event Name</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Venue</th>
                <th className="py-4 px-6 text-center">Capacity</th>
                <th className="py-4 px-6 text-center">Registrations</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B1F3A]/6 text-xs text-[#172033]">
              {recentEvents.map((evt) => (
                <tr
                  key={evt.id}
                  className="hover:bg-[#D4A72C]/5 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#0B1F3A] block text-sm group-hover:text-[#D4A72C] transition-colors">
                      {evt.title}
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      {evt.category} · {evt.organizer}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-[#0B1F3A] font-semibold tabular-nums">
                    {evt.date}
                  </td>

                  <td className="py-4 px-6 max-w-xs truncate text-[#64748B]">
                    {evt.venue}
                  </td>

                  <td className="py-4 px-6 text-center font-mono tabular-nums text-[#0B1F3A]">
                    {evt.capacity}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span className="font-mono font-bold text-[#0B1F3A] tabular-nums">
                      {evt.registeredCount}
                    </span>
                    <span className="text-[10px] text-[#64748B] block">
                      ({Math.round((evt.registeredCount / evt.capacity) * 100)}%)
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <EventStatusBadge status={evt.status} size="sm" />
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/faculty/events/${evt.id}/registrations`}
                        className="px-2.5 py-1 rounded bg-[#0B1F3A]/5 hover:bg-[#D4A72C] hover:text-[#0B1F3A] text-[#0B1F3A] text-xs font-bold transition-all"
                        title="View Registered Students"
                      >
                        Attendees
                      </Link>
                      <Link
                        to={`/faculty/events/edit/${evt.id}`}
                        className="p-1.5 text-[#64748B] hover:text-[#0B1F3A] rounded transition-colors"
                        title="Edit Event"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
