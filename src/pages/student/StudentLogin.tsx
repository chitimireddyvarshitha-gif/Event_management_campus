import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { GraduationCap, ArrowLeft, Mail, Lock, Sparkles, BookOpen } from 'lucide-react';

export const StudentLogin: React.FC = () => {
  const { login, quickDemoLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'College email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid college email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await login('student', { email, password, rememberMe });
    if (success) {
      navigate('/student/dashboard');
    }
  };

  const handleDemoFill = () => {
    setEmail('varshitha.c@campus.edu');
    setPassword('CampusPass@2026');
  };

  const handleQuickDemoAccess = () => {
    quickDemoLogin('student');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
      
      {/* Top Simple Navigation */}
      <header className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs text-[#64748B]">
          New student?{' '}
          <Link
            to="/student/register"
            className="font-bold text-[#0B1F3A] hover:text-[#D4A72C] underline decoration-[#D4A72C]"
          >
            Create an Account
          </Link>
        </span>
      </header>

      {/* Main Student Login Card */}
      <div className="max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-[#0B1F3A]/10 p-6 sm:p-8 shadow-sm">
          
          {/* Student Branding Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center mb-3 shadow-md shadow-[#0B1F3A]/10">
              <GraduationCap className="w-8 h-8 stroke-[2.2]" />
            </div>
            
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A72C] mb-1">
              Collegiate Access Portal
            </span>
            <h1 className="text-2xl font-extrabold text-[#0B1F3A]">
              Student Login
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xs">
              Access your personalized campus event calendar, registered badges, and seat confirmations.
            </p>
          </div>

          {/* Quick Demo Assist Banner */}
          <div className="mb-6 p-3 bg-[#D4A72C]/10 border border-[#D4A72C]/30 rounded-xl flex items-center justify-between gap-2">
            <div className="text-[11px] text-[#0B1F3A] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span>Demo Student: Varshitha</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[11px] font-bold text-[#0B1F3A] hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
              <span className="text-xs text-[#0B1F3A]/30">|</span>
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="text-[11px] font-bold text-[#0B1F3A] bg-[#D4A72C] px-2 py-0.5 rounded hover:bg-[#B88F20] transition-colors cursor-pointer"
              >
                1-Click In
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="College Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="e.g. varshitha.c@campus.edu"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
              autoComplete="email"
            />

            <FormInput
              label="Password"
              isPassword
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="Enter your student password"
              icon={<Lock className="w-4 h-4" />}
              error={errors.password}
              autoComplete="current-password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#0B1F3A]/20 text-[#0B1F3A] focus:ring-[#D4A72C] w-4 h-4"
                />
                <span className="text-[#64748B] font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link sent to your registered college email (simulated).')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#D4A72C] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold tracking-wide transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <GraduationCap className="w-4 h-4 text-[#D4A72C]" />
              <span>{isLoading ? 'Signing In...' : 'Sign In as Student'}</span>
            </button>
          </form>

          {/* Switch to Faculty */}
          <div className="mt-6 pt-5 border-t border-[#0B1F3A]/8 text-center">
            <p className="text-xs text-[#64748B]">
              Are you an event coordinator or faculty staff?
            </p>
            <Link
              to="/faculty/login"
              className="inline-block mt-1 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C]"
            >
              Switch to Faculty Portal →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <footer className="py-4 text-center text-xs text-[#64748B]">
        <span>Campus Event Management System · Student Portal</span>
      </footer>
    </div>
  );
};
