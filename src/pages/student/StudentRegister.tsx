import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { GraduationCap, ArrowLeft, User, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';

export const StudentRegister: React.FC = () => {
  const { registerStudent, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const getPasswordStrength = (pwd: string): { label: string; score: number; color: string } => {
    if (!pwd) return { label: 'None', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { label: 'Weak', score: 25, color: 'bg-[#C62828]' };
    if (score === 3) return { label: 'Fair', score: 50, color: 'bg-[#D99A00]' };
    if (score === 4) return { label: 'Good', score: 75, color: 'bg-[#D4A72C]' };
    return { label: 'Strong', score: 100, color: 'bg-[#198754]' };
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'College email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid institutional email address';
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      errs.terms = 'You must agree to campus event honor code and policies';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await registerStudent({ name, email, phone, password });
    if (success) {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
      
      {/* Header */}
      <header className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs text-[#64748B]">
          Already registered?{' '}
          <Link
            to="/student/login"
            className="font-bold text-[#0B1F3A] hover:text-[#D4A72C] underline decoration-[#D4A72C]"
          >
            Student Login
          </Link>
        </span>
      </header>

      {/* Main Registration Card */}
      <div className="max-w-lg w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-[#0B1F3A]/10 p-6 sm:p-8 shadow-sm">
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center mb-3 shadow-md shadow-[#0B1F3A]/10">
              <GraduationCap className="w-8 h-8 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A72C] mb-1">
              Student Enrollment
            </span>
            <h1 className="text-2xl font-extrabold text-[#0B1F3A]">
              Create Student Account
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm">
              Register with your collegiate credentials to unlock event sign-ups, badges, and workshop certificates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="e.g. Varshitha Chitimireddy"
              icon={<User className="w-4 h-4" />}
              error={errors.name}
            />

            <FormInput
              label="College Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="e.g. varshitha.c@campus.edu"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="e.g. +1 (555) 234-8901"
              icon={<Phone className="w-4 h-4" />}
              error={errors.phone}
            />

            <div className="space-y-1.5">
              <FormInput
                label="Password"
                isPassword
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                placeholder="Create a strong password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password}
              />
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B]">Strength:</span>
                    <span className="font-bold text-[#0B1F3A]">{strength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <FormInput
              label="Confirm Password"
              isPassword
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              placeholder="Re-enter password"
              icon={<Lock className="w-4 h-4" />}
              error={errors.confirmPassword}
            />

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.terms) setErrors({ ...errors, terms: '' });
                  }}
                  className="mt-0.5 rounded border-[#0B1F3A]/20 text-[#0B1F3A] focus:ring-[#D4A72C] w-4 h-4"
                />
                <span className="text-xs text-[#64748B] leading-relaxed">
                  I agree to the university event code of conduct, seat reservation policies, and campus attendance regulations.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-[#C62828] mt-1 font-medium">
                  • {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold tracking-wide transition-all shadow-md mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C]" />
              <span>{isLoading ? 'Creating Account...' : 'Complete Student Registration'}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#0B1F3A]/8 text-center">
            <span className="text-xs text-[#64748B]">Already hold an active enrollment?</span>{' '}
            <Link
              to="/student/login"
              className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] underline decoration-[#D4A72C]"
            >
              Sign In Here
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-[#64748B]">
        <span>Campus Event Management System · Student Portal</span>
      </footer>
    </div>
  );
};
