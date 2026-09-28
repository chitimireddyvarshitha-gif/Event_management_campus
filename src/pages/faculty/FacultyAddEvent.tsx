import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { FormInput } from '../../components/common/FormInput';
import { EventCategory, EventStatus } from '../../types';
import {
  PlusCircle,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Campus Quad & Pavilion', url: '/src/assets/images/hero_campus_portal_1790559781450.jpg' },
  { label: 'Collegiate Hackathon', url: '/src/assets/images/event_campus_hackathon_1790559795018.jpg' },
  { label: 'Auditorium Cultural Fest', url: '/src/assets/images/event_cultural_fest_1790559807104.jpg' },
  { label: 'Keynote Tech Summit', url: '/src/assets/images/event_tech_summit_1790559818879.jpg' },
  { label: 'Varsity Athletics Field', url: '/src/assets/images/event_sports_tournament_1790559831246.jpg' },
];

export const FacultyAddEvent: React.FC = () => {
  const { createEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical' as EventCategory,
    date: '',
    time: '09:30 AM',
    venue: '',
    organizer: 'School of Computing & Engineering',
    capacity: 200,
    deadline: '',
    imageUrl: PRESET_IMAGES[1].url,
    status: 'Registration Open' as EventStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.description.trim()) errs.description = 'Event description is required';
    if (!formData.date) errs.date = 'Event date is required';
    if (!formData.time.trim()) errs.time = 'Event time is required';
    if (!formData.venue.trim()) errs.venue = 'Campus venue location is required';
    if (!formData.organizer.trim()) errs.organizer = 'Organizing department or guild is required';
    if (!formData.capacity || formData.capacity < 1) errs.capacity = 'Capacity must be at least 1';
    if (!formData.deadline) errs.deadline = 'Registration deadline is required';

    if (formData.date && formData.deadline && formData.deadline > formData.date) {
      errs.deadline = 'Deadline cannot be after the scheduled event date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const success = await createEvent(formData);
    setIsSubmitting(false);

    if (success) {
      navigate('/faculty/events');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/faculty/events"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manage Events</span>
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0B1F3A]/8">
          <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center font-bold">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1F3A]">
              Create New Campus Event
            </h1>
            <p className="text-xs text-[#64748B]">
              Schedule a university event, define attendee thresholds, and open registration.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <FormInput
            label="Event Title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            placeholder="e.g. AI & Future Technologies Summit 2026"
            error={errors.title}
          />

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
              Event Description & Program Itinerary
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              placeholder="Detailed description of keynote addresses, technical tracks, or tournament brackets..."
              className={`w-full p-3.5 bg-white border ${
                errors.description ? 'border-[#C62828]' : 'border-[#0B1F3A]/20 focus:border-[#D4A72C]'
              } rounded-lg text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#D4A72C]/20 transition-all shadow-xs`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-[#C62828] font-medium">• {errors.description}</p>
            )}
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                Event Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                className="w-full py-2.5 px-3 bg-white border border-[#0B1F3A]/20 rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#D4A72C] transition-colors"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                Initial Event Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                className="w-full py-2.5 px-3 bg-white border border-[#0B1F3A]/20 rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#D4A72C] transition-colors"
              >
                <option value="Registration Open">Registration Open</option>
                <option value="Upcoming">Upcoming (Scheduled)</option>
                <option value="Registration Closed">Registration Closed</option>
                <option value="Event Full">Event Full</option>
              </select>
            </div>
          </div>

          {/* Date, Time, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormInput
              label="Event Date"
              type="date"
              value={formData.date}
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
                if (errors.date) setErrors({ ...errors, date: '' });
              }}
              icon={<Calendar className="w-4 h-4" />}
              error={errors.date}
            />

            <FormInput
              label="Event Time"
              value={formData.time}
              onChange={(e) => {
                setFormData({ ...formData, time: e.target.value });
                if (errors.time) setErrors({ ...errors, time: '' });
              }}
              placeholder="e.g. 09:30 AM"
              icon={<Clock className="w-4 h-4" />}
              error={errors.time}
            />

            <FormInput
              label="Campus Venue"
              value={formData.venue}
              onChange={(e) => {
                setFormData({ ...formData, venue: e.target.value });
                if (errors.venue) setErrors({ ...errors, venue: '' });
              }}
              placeholder="e.g. Sir C.V. Raman Hall"
              icon={<MapPin className="w-4 h-4" />}
              error={errors.venue}
            />
          </div>

          {/* Organizer, Capacity, Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormInput
              label="Organizing Body"
              value={formData.organizer}
              onChange={(e) => {
                setFormData({ ...formData, organizer: e.target.value });
                if (errors.organizer) setErrors({ ...errors, organizer: '' });
              }}
              placeholder="e.g. Dept of Computing"
              icon={<Building className="w-4 h-4" />}
              error={errors.organizer}
            />

            <FormInput
              label="Maximum Seat Capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => {
                setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 });
                if (errors.capacity) setErrors({ ...errors, capacity: '' });
              }}
              icon={<Users className="w-4 h-4" />}
              error={errors.capacity}
            />

            <FormInput
              label="Registration Deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => {
                setFormData({ ...formData, deadline: e.target.value });
                if (errors.deadline) setErrors({ ...errors, deadline: '' });
              }}
              icon={<Clock className="w-4 h-4" />}
              error={errors.deadline}
            />
          </div>

          {/* Image Selection with Presets */}
          <div className="space-y-2">
            <FormInput
              label="Event Cover Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              icon={<ImageIcon className="w-4 h-4" />}
            />

            {/* Quick preset selector */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#64748B] block mb-2">
                Or select high-fidelity collegiate cover image:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                    className={`relative rounded-lg overflow-hidden border-2 text-left p-1 transition-all ${
                      formData.imageUrl === img.url
                        ? 'border-[#D4A72C] ring-2 ring-[#D4A72C]/30'
                        : 'border-[#0B1F3A]/10 hover:border-[#0B1F3A]/30'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-14 object-cover rounded" />
                    <span className="text-[10px] font-semibold text-[#0B1F3A] block truncate mt-1">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#0B1F3A]/8 flex items-center justify-end gap-3">
            <Link
              to="/faculty/events"
              className="px-5 py-2.5 rounded-xl border border-[#0B1F3A]/20 hover:bg-[#0B1F3A]/5 text-xs font-bold text-[#0B1F3A] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C]" />
              <span>{isSubmitting ? 'Creating Event...' : 'Create Event'}</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
