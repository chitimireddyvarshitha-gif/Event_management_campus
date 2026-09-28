import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { FormInput } from '../../components/common/FormInput';
import { EventCategory, EventStatus } from '../../types';
import {
  Edit,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building,
  Users,
  Image as ImageIcon,
  Save,
  AlertCircle
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Campus Quad & Pavilion', url: '/src/assets/images/hero_campus_portal_1790559781450.jpg' },
  { label: 'Collegiate Hackathon', url: '/src/assets/images/event_campus_hackathon_1790559795018.jpg' },
  { label: 'Auditorium Cultural Fest', url: '/src/assets/images/event_cultural_fest_1790559807104.jpg' },
  { label: 'Keynote Tech Summit', url: '/src/assets/images/event_tech_summit_1790559818879.jpg' },
  { label: 'Varsity Athletics Field', url: '/src/assets/images/event_sports_tournament_1790559831246.jpg' },
];

export const FacultyEditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();

  const event = id ? getEventById(id) : undefined;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical' as EventCategory,
    date: '',
    time: '',
    venue: '',
    organizer: '',
    capacity: 200,
    deadline: '',
    imageUrl: '',
    status: 'Registration Open' as EventStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        date: event.date,
        time: event.time,
        venue: event.venue,
        organizer: event.organizer,
        capacity: event.capacity,
        deadline: event.deadline,
        imageUrl: event.imageUrl,
        status: event.status,
      });
    }
  }, [event]);

  if (!event) {
    return (
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-12 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#0B1F3A]">Event Record Not Found</h2>
        <p className="text-xs text-[#64748B] mt-2 mb-6">
          Unable to locate the specified event record for editing.
        </p>
        <Link
          to="/faculty/events"
          className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold hover:bg-[#071426] transition-colors"
        >
          Return to Events Management
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.description.trim()) errs.description = 'Event description is required';
    if (!formData.date) errs.date = 'Event date is required';
    if (!formData.time.trim()) errs.time = 'Event time is required';
    if (!formData.venue.trim()) errs.venue = 'Campus venue location is required';
    if (!formData.organizer.trim()) errs.organizer = 'Organizing department or guild is required';
    if (!formData.capacity || formData.capacity < 1) errs.capacity = 'Capacity must be at least 1';
    if (formData.capacity < event.registeredCount) {
      errs.capacity = `Capacity cannot be lower than current active enrollments (${event.registeredCount})`;
    }
    if (!formData.deadline) errs.deadline = 'Registration deadline is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !id) return;

    setIsSubmitting(true);
    const success = await updateEvent(id, formData);
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

      {/* Edit Form */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0B1F3A]/8">
          <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center font-bold">
            <Edit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1F3A]">
              Edit Campus Event: {event.title}
            </h1>
            <p className="text-xs text-[#64748B]">
              Update venue schedules, capacity limits, and registration status flags.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <FormInput
            label="Event Title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            error={errors.title}
          />

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
              className={`w-full p-3.5 bg-white border ${
                errors.description ? 'border-[#C62828]' : 'border-[#0B1F3A]/20 focus:border-[#D4A72C]'
              } rounded-lg text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#D4A72C]/20 transition-all shadow-xs`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-[#C62828] font-medium">• {errors.description}</p>
            )}
          </div>

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
                Event Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                className="w-full py-2.5 px-3 bg-white border border-[#0B1F3A]/20 rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#D4A72C] transition-colors"
              >
                <option value="Registration Open">Registration Open</option>
                <option value="Upcoming">Upcoming (Scheduled)</option>
                <option value="Event Full">Event Full</option>
                <option value="Registration Closed">Registration Closed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

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
              icon={<MapPin className="w-4 h-4" />}
              error={errors.venue}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormInput
              label="Organizing Body"
              value={formData.organizer}
              onChange={(e) => {
                setFormData({ ...formData, organizer: e.target.value });
                if (errors.organizer) setErrors({ ...errors, organizer: '' });
              }}
              icon={<Building className="w-4 h-4" />}
              error={errors.organizer}
            />

            <FormInput
              label="Capacity"
              type="number"
              min={event.registeredCount || 1}
              value={formData.capacity}
              onChange={(e) => {
                setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 });
                if (errors.capacity) setErrors({ ...errors, capacity: '' });
              }}
              helperText={`Current enrolled students: ${event.registeredCount}`}
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

          <div className="space-y-2">
            <FormInput
              label="Event Cover Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              icon={<ImageIcon className="w-4 h-4" />}
            />

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

          {/* Action Buttons */}
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
              <Save className="w-4 h-4 text-[#D4A72C]" />
              <span>{isSubmitting ? 'Saving Changes...' : 'Save Changes'}</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
