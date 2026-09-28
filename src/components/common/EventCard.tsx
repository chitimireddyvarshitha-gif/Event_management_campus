import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CampusEvent } from '../../types';
import { EventStatusBadge } from './EventStatusBadge';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: CampusEvent;
  isRegistered?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isRegistered }) => {
  const [imageError, setImageError] = useState(false);
  const availableSeats = Math.max(0, event.capacity - event.registeredCount);
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  return (
    <div className="bg-white rounded-xl border border-[#0B1F3A]/8 overflow-hidden shadow-xs hover:shadow-md hover:border-[#D4A72C]/40 transition-all duration-200 flex flex-col group">
      {/* Image Banner */}
      <div className="relative h-48 w-full bg-[#0B1F3A]/10 overflow-hidden">
        {!imageError && event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#071426] flex items-center justify-center p-4">
            <span className="text-[#D4A72C] font-semibold text-lg text-center tracking-wide">
              {event.title}
            </span>
          </div>
        )}
        
        {/* Category Label Overlay */}
        <div className="absolute top-3 left-3 bg-[#0B1F3A]/90 backdrop-blur-xs text-[#D4A72C] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#D4A72C]/30 shadow-xs">
          {event.category}
        </div>

        {/* Registered Indicator if user is enrolled */}
        {isRegistered && (
          <div className="absolute top-3 right-3 bg-[#198754] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
            Enrolled
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Status Badge */}
          <div className="mb-2">
            <EventStatusBadge status={event.status} size="sm" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#0B1F3A] line-clamp-1 group-hover:text-[#D4A72C] transition-colors">
            {event.title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Metadata Grid */}
          <div className="mt-4 space-y-1.5 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
              <span>{event.date}</span>
              <span className="text-[#64748B]/40">·</span>
              <Clock className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                <span className="tabular-nums font-semibold text-[#172033]">
                  {availableSeats} seats left
                </span>
                <span className="text-xs text-[#64748B]">({event.capacity} total)</span>
              </div>
              <span className="text-[11px] text-[#64748B]">
                Due: {event.deadline}
              </span>
            </div>

            {/* Mini Progress Bar for seats */}
            <div className="w-full bg-[#0B1F3A]/5 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  percentFilled >= 100
                    ? 'bg-[#C62828]'
                    : percentFilled > 80
                    ? 'bg-[#D4A72C]'
                    : 'bg-[#198754]'
                }`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-5 pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between">
          <span className="text-xs text-[#64748B] truncate max-w-[130px]">
            {event.organizer}
          </span>
          <Link
            to={`/student/events/${event.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
