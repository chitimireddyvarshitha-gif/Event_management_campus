import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { StatsCard } from '../../components/common/StatsCard';
import { EventCard } from '../../components/common/EventCard';
import { EventStatusBadge } from '../../components/common/EventStatusBadge';
import {
  CalendarDays,
  BookmarkCheck,
  CheckCircle,
  Sparkles,
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  UserCheck
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { events, studentRegistrations, isStudentRegistered } = useEvents();
  const navigate = useNavigate();

  // Statistics calculation
  const totalUpcomingEvents = events.filter((e) => e.status === 'Registration Open' || e.status === 'Upcoming').length;
  const myActiveRegistrations = studentRegistrations.filter((r) => r.status === 'Registered');
  const myCompletedRegistrations = studentRegistrations.filter((r) => r.status === 'Completed').length;
  const availableEventsCount = events.filter((e) => e.status === 'Registration Open').length;

  // Upcoming registered events details
  const registeredEventObjects = myActiveRegistrations.map((reg) => {
    const fullEvent = events.find((e) => e.id === reg.eventId);
    return {
      registration: reg,
      event: fullEvent,
    };
  });

  // Recommended events (Events student is NOT yet registered for, open status)
  const recommendedEvents = events
    .filter((e) => !isStudentRegistered(e.id) && e.status === 'Registration Open')
    .slice(0, 3);

  const firstName = currentUser?.name?.split(' ')[0] || 'Varshitha';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Welcome Section & Quick Action Bar */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Collegiate Student Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
            Discover and participate in exciting campus events, hackathons, and certified workshops.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/student/events"
            className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D4A72C]" />
            <span>Browse Events</span>
          </Link>
          <Link
            to="/student/registrations"
            className="px-4 py-2.5 rounded-xl border border-[#0B1F3A]/20 hover:border-[#D4A72C] hover:bg-[#D4A72C]/10 text-[#0B1F3A] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4 text-[#D4A72C]" />
            <span>My Registrations</span>
          </Link>
          <Link
            to="/student/profile"
            className="p-2.5 rounded-xl border border-[#0B1F3A]/20 hover:border-[#D4A72C] text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
            title="View Profile"
          >
            <UserCheck className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          label="Upcoming Events"
          value={totalUpcomingEvents}
          icon={<CalendarDays className="w-6 h-6" />}
          subtext="On university calendar"
        />
        <StatsCard
          label="My Registrations"
          value={myActiveRegistrations.length}
          icon={<BookmarkCheck className="w-6 h-6" />}
          subtext="Confirmed enrolled seats"
        />
        <StatsCard
          label="Completed Events"
          value={myCompletedRegistrations}
          icon={<CheckCircle className="w-6 h-6" />}
          subtext="Attendance validated"
        />
        <StatsCard
          label="Available Events"
          value={availableEventsCount}
          icon={<Sparkles className="w-6 h-6" />}
          subtext="Open for enrollment"
        />
      </div>

      {/* 3. Upcoming Registered Events Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-[#D4A72C]" />
              <span>Upcoming Registered Events</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Events you are actively enrolled in for the current academic session.
            </p>
          </div>
          <Link
            to="/student/registrations"
            className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] flex items-center gap-1 transition-colors"
          >
            <span>View All ({myActiveRegistrations.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {registeredEventObjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEventObjects.map(({ registration, event }) => {
              if (!event) return null;
              return (
                <div
                  key={registration.id}
                  className="bg-white rounded-xl border border-[#0B1F3A]/8 p-5 shadow-xs hover:border-[#D4A72C]/50 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-[#D4A72C] uppercase tracking-wider">
                        {event.category}
                      </span>
                      <EventStatusBadge status={registration.status} size="sm" />
                    </div>

                    <h3 className="text-base font-bold text-[#0B1F3A] line-clamp-1 mb-2">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-[#64748B]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                        <span>{event.date}</span>
                        <span>·</span>
                        <Clock className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">
                      Enrolled: {registration.registrationDate}
                    </span>
                    <Link
                      to={`/student/events/${event.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 text-[#D4A72C]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#0B1F3A]/8 p-8 text-center">
            <BookmarkCheck className="w-10 h-10 text-[#D4A72C] mx-auto mb-2 opacity-80" />
            <h4 className="text-sm font-bold text-[#0B1F3A]">You have no active event registrations</h4>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              Explore the upcoming campus schedule to enroll in hackathons, workshops, and sports matches.
            </p>
            <Link
              to="/student/events"
              className="mt-4 inline-block px-4 py-2 rounded-lg bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#071426] transition-colors"
            >
              Browse Available Events
            </Link>
          </div>
        )}
      </section>

      {/* 4. Recommended Events Section */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4A72C]" />
              <span>Recommended For You</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              Selected based on your department ({currentUser?.department || 'Engineering'}).
            </p>
          </div>
          <Link
            to="/student/events"
            className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] flex items-center gap-1 transition-colors"
          >
            <span>All Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} isRegistered={false} />
          ))}
        </div>
      </section>

    </div>
  );
};
