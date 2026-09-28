import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { Modal } from '../../components/common/Modal';
import { FormInput } from '../../components/common/FormInput';
import {
  ShieldCheck,
  Mail,
  Phone,
  Building,
  Briefcase,
  Award,
  Edit3,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';

export const FacultyProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { events } = useEvents();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Dr. Robert Vance',
    email: currentUser?.email || 'r.vance@campus.edu',
    phone: currentUser?.phone || '+1 (555) 472-9102',
    department: currentUser?.department || 'School of Computing & Engineering',
    designation: currentUser?.designation || 'Associate Dean of Student Activities & Event Coordinator',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenEdit = () => {
    setFormData({
      name: currentUser?.name || 'Dr. Robert Vance',
      email: currentUser?.email || 'r.vance@campus.edu',
      phone: currentUser?.phone || '+1 (555) 472-9102',
      department: currentUser?.department || 'School of Computing & Engineering',
      designation: currentUser?.designation || 'Associate Dean of Student Activities & Event Coordinator',
    });
    setErrors({});
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Coordinator name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.department.trim()) errs.department = 'Department is required';
    if (!formData.designation.trim()) errs.designation = 'Designation is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    updateProfile(formData);
    setIsEditModalOpen(false);
  };

  const totalCapacityManaged = events.reduce((sum, e) => sum + e.capacity, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border-t-4 border-t-[#D4A72C] border-x border-b border-[#0B1F3A]/8 p-6 sm:p-8 shadow-xs">
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
                  'RV'
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#D4A72C] text-[#0B1F3A] p-1.5 rounded-lg shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1F3A]/8 text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider mb-1">
                Authorized Faculty Coordinator
              </div>
              <h1 className="text-2xl font-extrabold text-[#0B1F3A]">
                {currentUser?.name || 'Dr. Robert Vance'}
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                {currentUser?.designation || 'Associate Dean of Student Activities & Event Coordinator'}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>{currentUser?.department || 'School of Computing & Engineering'}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>{currentUser?.email || 'r.vance@campus.edu'}</span>
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

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Administrative Credentials */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 shadow-xs space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center gap-2 border-b border-[#0B1F3A]/8 pb-3">
            <Briefcase className="w-4 h-4 text-[#D4A72C]" />
            <span>Institutional Governance Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Department / Division</span>
              <span className="text-sm font-bold text-[#0B1F3A]">
                {currentUser?.department || 'School of Computing & Engineering'}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Administrative Designation</span>
              <span className="text-sm font-bold text-[#0B1F3A]">
                {currentUser?.designation || 'Associate Dean & Coordinator'}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Official Coordinator Email</span>
              <span className="text-sm font-bold text-[#0B1F3A] truncate">
                {currentUser?.email || 'r.vance@campus.edu'}
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#0B1F3A]/6">
              <span className="text-[#64748B] font-medium block mb-1">Direct Campus Extension</span>
              <span className="text-sm font-bold text-[#0B1F3A]">
                {currentUser?.phone || '+1 (555) 472-9102'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0B1F3A]/5 rounded-xl border border-[#0B1F3A]/10 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#D4A72C] shrink-0 mt-0.5" />
            <div className="text-xs text-[#0B1F3A]">
              <span className="font-bold block">Academic Authority & Permissions</span>
              <span>Granted administrative rights for venue booking, student certificate dispatch, and budgetary authorization for collegiate activities.</span>
            </div>
          </div>
        </div>

        {/* Right Col: Scope Summary */}
        <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-6 shadow-xs space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center gap-2 border-b border-[#0B1F3A]/8 pb-3">
            <CalendarCheck className="w-4 h-4 text-[#D4A72C]" />
            <span>Supervision Scope</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA]">
              <span className="text-xs text-[#64748B]">Active Campus Events</span>
              <span className="text-lg font-bold text-[#0B1F3A] tabular-nums font-mono">
                {events.length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA]">
              <span className="text-xs text-[#64748B]">Total Capacity Under Remit</span>
              <span className="text-lg font-bold text-[#0B1F3A] tabular-nums font-mono">
                {totalCapacityManaged.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA]">
              <span className="text-xs text-[#64748B]">Term Governance Status</span>
              <span className="text-xs font-bold text-[#198754]">Active Term 2026</span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-[#64748B]">
              Administrative credentials encrypted with university security standards.
            </p>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Faculty Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <FormInput
            label="Coordinator Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <FormInput
            label="Academic Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            error={errors.department}
          />

          <FormInput
            label="Designation / Title"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            error={errors.designation}
          />

          <FormInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
          />

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
