import React from 'react';
import { EventStatus, RegistrationStatus } from '../../types';

interface EventStatusBadgeProps {
  status: EventStatus | RegistrationStatus;
  size?: 'sm' | 'md';
}

export const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorStyle = 'text-[#0B1F3A] bg-[#0B1F3A]/8 border-[#0B1F3A]/20';
  let dotColor = 'bg-[#0B1F3A]';

  switch (status) {
    case 'Registered':
      colorStyle = 'text-[#198754] bg-[#198754]/10 border-[#198754]/25';
      dotColor = 'bg-[#198754]';
      break;
    case 'Registration Open':
      colorStyle = 'text-[#966b08] bg-[#D4A72C]/15 border-[#D4A72C]/35';
      dotColor = 'bg-[#D4A72C]';
      break;
    case 'Upcoming':
      colorStyle = 'text-[#0B1F3A] bg-[#0B1F3A]/10 border-[#0B1F3A]/20';
      dotColor = 'bg-[#0B1F3A]';
      break;
    case 'Event Full':
    case 'Cancelled':
      colorStyle = 'text-[#C62828] bg-[#C62828]/10 border-[#C62828]/25';
      dotColor = 'bg-[#C62828]';
      break;
    case 'Registration Closed':
    case 'Completed':
    default:
      colorStyle = 'text-[#64748B] bg-[#64748B]/10 border-[#64748B]/20';
      dotColor = 'bg-[#64748B]';
      break;
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-md border tracking-wide uppercase ${padding} ${colorStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};
