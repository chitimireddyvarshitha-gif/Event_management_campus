import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { EventStatusBadge } from '../../components/common/EventStatusBadge';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Building2,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles
} from 'lucide-react';

export const StudentEventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, registerForEvent, isStudentRegistered, cancelRegistration, studentRegistrations } = useEvents();
  const { currentUser, role } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const event = id ? getEventById(id) : undefined;
  const isRegistered = id ? isStudentRegistered(id) : false;

  // Find active registration record if registered
  const userRegistration = studentRegistrations.find(
    (r) => r.eventId === id && r.status === 'Registered'
  );

  if (!event) {
    return (
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-12 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#0B1F3A]">Event Record Not Found</h2>
        <p className="text-xs text-[#64748B] mt-2 mb-6">
          The requested event may have been rescheduled or removed from the catalog.
        </p>
        <Link
          to="/student/events"
          className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#071426] transition-colors"
        >
          Return to Events Catalog
        </Link>
      </div>
    );
  }

  const availableSeats = Math.max(0, event.capacity - event.registeredCount);
  const isFull = availableSeats <= 0 || event.status === 'Event Full';
  const isClosed = event.status === 'Registration Closed' || event.status === 'Completed';

  // Handle student registration
  const handleRegister = async () => {
    if (!currentUser) {
      navigate('/student/login');
      return;
    }
    setIsRegistering(true);
    await registerForEvent(event);
    setIsRegistering(false);
  };

  const handleConfirmCancel = async () => {
    if (userRegistration) {
      await cancelRegistration(userRegistration.id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Back button */}
      <div>
        <Link
          to="/student/events"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Catalog</span>
        </Link>
      </div>

      {/* Main Event Showcase Card */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 overflow-hidden shadow-xs">
        
        {/* Large Image Header */}
        <div className="relative h-64 sm:h-96 w-full bg-[#0B1F3A]/10">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/30 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-[#0B1F3A]/90 backdrop-blur-xs text-[#D4A72C] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#D4A72C]/40 shadow-xs">
              {event.category}
            </span>
            <EventStatusBadge status={event.status} />
          </div>

          {/* Floating Enrolled Badge */}
          {isRegistered && (
            <div className="absolute top-4 right-4 bg-[#198754] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>You Are Registered</span>
            </div>
          )}

          {/* Title on Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-xs">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D4A72C]" />
              <span>Organized by {event.organizer}</span>
            </p>
          </div>
        </div>

        {/* Content & Action Bar */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Description & Program Highlights */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-3">
                Event Overview & Description
              </h2>
              <p className="text-sm text-[#172033] leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="p-5 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/8 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A72C]" />
                <span>Collegiate Participation Privileges</span>
              </h3>
              <ul className="text-xs text-[#64748B] space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                  <span>Official University Participation Certificate and Dean Credential Points</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                  <span>Complimentary delegate package, handbook, and campus networking pass</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#198754]" />
                  <span>Direct interaction with keynote coordinators and departmental chairs</span>
                </li>
              </ul>
            </div>

            {/* If registered, show student cancellation option */}
            {isRegistered && (
              <div className="p-4 rounded-xl border border-[#C62828]/20 bg-[#C62828]/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#C62828]">
                    Cancel Registration
                  </p>
                  <p className="text-[11px] text-[#64748B]">
                    Can no longer attend? Free your seat for fellow students on the waitlist.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="px-3 py-1.5 text-xs font-bold text-[#C62828] hover:bg-[#C62828] hover:text-white rounded-lg border border-[#C62828]/30 transition-colors cursor-pointer"
                >
                  Cancel Registration
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Key Details & Dynamic Action Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Action Box */}
            <div className="bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/10 p-6 space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                  Registration Status
                </span>
                
                {/* Dynamic State Rendering */}
                {isRegistered ? (
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled
                      className="w-full py-3.5 px-4 rounded-xl bg-[#198754] text-white text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 cursor-default shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Already Registered</span>
                    </button>
                    <p className="text-[11px] text-center text-[#198754] font-medium">
                      Your seat is confirmed. Check My Registrations for details.
                    </p>
                  </div>
                ) : isFull ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled
                      className="w-full py-3.5 px-4 rounded-xl bg-[#64748B]/30 text-[#64748B] text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <span>Event Full</span>
                    </button>
                    <p className="text-[11px] text-center text-[#C62828] font-medium">
                      Maximum seat capacity reached for this venue.
                    </p>
                  </div>
                ) : isClosed ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled
                      className="w-full py-3.5 px-4 rounded-xl bg-[#64748B]/30 text-[#64748B] text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <span>Registration Closed</span>
                    </button>
                    <p className="text-[11px] text-center text-[#64748B]">
                      The enrollment period for this event has concluded.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleRegister}
                      disabled={isRegistering}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#D4A72C] hover:bg-[#B88F20] text-[#0B1F3A] text-xs font-extrabold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-[#0B1F3A]" />
                      <span>{isRegistering ? 'Processing Registration...' : 'Register Now'}</span>
                    </button>
                    <p className="text-[11px] text-center text-[#64748B]">
                      Instant confirmation with university credentials.
                    </p>
                  </div>
                )}
              </div>

              {/* Event Specification List */}
              <div className="pt-4 border-t border-[#0B1F3A]/10 space-y-3.5 text-xs">
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">Date</span>
                    <span className="text-[#64748B]">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">Time</span>
                    <span className="text-[#64748B]">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">Venue</span>
                    <span className="text-[#64748B]">{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0B1F3A]">Capacity</span>
                      <span className="tabular-nums font-semibold text-[#0B1F3A]">
                        {availableSeats} left / {event.capacity} total
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-[#0B1F3A]/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D4A72C] h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">Registration Deadline</span>
                    <span className="text-[#64748B]">{event.deadline}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Dialog for Cancellation */}
      <ConfirmationDialog
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Registration"
        message="Are you sure you want to cancel your registration? Your reserved seat will be released for other students."
        confirmLabel="Yes, Cancel Registration"
        cancelLabel="Keep Registration"
        isDestructive
      />
    </div>
  );
};
