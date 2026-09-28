import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { Modal } from '../../components/common/Modal';
import { FormInput } from '../../components/common/FormInput';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Calendar,
  BookmarkCheck,
  Edit3,
  Award,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { studentRegistrations } = useEvents();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    department: currentUser?.department || '',
    year: currentUser?.year || '3rd Year (Junior)',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenEdit = () => {
    setFormData({
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      department: currentUser?.department || '',
      year: currentUser?.year || '3rd Year (Junior)',
    });
    setErrors({});
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name cannot be blank';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.department.trim()) errs.department = 'Department is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    updateProfile(formData);
    setIsEditModalOpen(false);
  };

  const activeRegistrations = studentRegistrations.filter((r) => r.status === 'Registered').length;
  const completedEvents = studentRegistrations.filter((r) => r.status === 'Completed').length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-[#0B1F3A] border-2 border-[#D4A72C] flex items-center justify-center text-white text-2xl font-extrabold overflow-hidden shadow-md">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  currentUser?.name.charAt(0) || 'S'
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#D4A72C] text-[#0B1F3A] p-1.5 rounded-lg shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#D4A72C]/15 text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider mb-1">
                Verified Student Scholar
              </div>
              <h1 className="text-2xl font-extrabold text-[#0B1F3A]">
                {currentUser?.name || 'Varshitha Chitimireddy'}
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                {currentUser?.department || 'Computer Science & Engineering'} · {currentUser?.year || '3rd Year (Junior)'}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>{currentUser?.email}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>{currentUser?.phone}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            type="button"
            onClick={handleOpenEdit}
            className="px-4 py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Grid of Profile Details & Institutional Records */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Academic Credentials */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 shadow-xs space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center gap-2 border-b border-[#0B1F3A]/8 pb-3">
            <Building className="w-4 h-4 text-[#D4A72C]" />
            <span>Collegiate Enrollment Credentials</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Academic Department</span>
              <span className="text-sm font-bold text-[#0B1F3A]">{currentUser?.department || 'Computer Science'}</span>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Curriculum Class Year</span>
              <span className="text-sm font-bold text-[#0B1F3A]">{currentUser?.year || '3rd Year (Junior)'}</span>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Institutional Student ID</span>
              <span className="text-sm font-mono font-bold text-[#0B1F3A] tabular-nums">STD-2024-8901</span>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Official Student Email</span>
              <span className="text-sm font-bold text-[#0B1F3A] truncate">{currentUser?.email}</span>
            </div>
          </div>

          <div className="p-4 bg-[#D4A72C]/10 rounded-xl border border-[#D4A72C]/30 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#0B1F3A] shrink-0 mt-0.5" />
            <div className="text-xs text-[#0B1F3A]">
              <span className="font-bold block">Academic Dean’s Merit Standing</span>
              <span>In good institutional standing. Eligible for all university hackathons and inter-collegiate events.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Participation Summary */}
        <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 shadow-xs space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center gap-2 border-b border-[#0B1F3A]/8 pb-3">
            <BookmarkCheck className="w-4 h-4 text-[#D4A72C]" />
            <span>Event Summary</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA]">
              <span className="text-xs text-[#64748B]">Active Enrolled Events</span>
              <span className="text-lg font-bold text-[#0B1F3A] tabular-nums">
                {activeRegistrations}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA]">
              <span className="text-xs text-[#64748B]">Completed Events</span>
              <span className="text-lg font-bold text-[#0B1F3A] tabular-nums">
                {completedEvents}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA]">
              <span className="text-xs text-[#64748B]">Total Registrations</span>
              <span className="text-lg font-bold text-[#0B1F3A] tabular-nums">
                {studentRegistrations.length}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-[#64748B]">
              Registration records are validated against university card readers at entrance turnstiles.
            </p>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <FormInput
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <FormInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
          />

          <FormInput
            label="Academic Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            error={errors.department}
          />

          <div>
            <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
              Class Year
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full py-2.5 px-3 bg-white border border-[#0B1F3A]/20 rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#D4A72C] transition-colors"
            >
              <option value="1st Year (Freshman)">1st Year (Freshman)</option>
              <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
              <option value="3rd Year (Junior)">3rd Year (Junior)</option>
              <option value="4th Year (Senior)">4th Year (Senior)</option>
              <option value="Postgraduate (Masters/PhD)">Postgraduate (Masters/PhD)</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#0B1F3A]/8">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-[#0B1F3A]/20 text-xs font-bold text-[#0B1F3A] hover:bg-[#0B1F3A]/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
