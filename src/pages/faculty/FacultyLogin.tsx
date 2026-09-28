import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { ShieldCheck, ArrowLeft, Mail, Lock, Sparkles, Building2, KeyRound } from 'lucide-react';

export const FacultyLogin: React.FC = () => {
  const { login, quickDemoLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Faculty email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid faculty email address';
    }

    if (!password) {
      errs.password = 'Faculty password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await login('faculty', { email, password, rememberMe });
    if (success) {
      navigate('/faculty/dashboard');
    }
  };

  const handleDemoFill = () => {
    setEmail('r.vance@campus.edu');
    setPassword('FacultyPass@2026');
  };

  const handleQuickDemoAccess = () => {
    quickDemoLogin('faculty');
    navigate('/faculty/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
      
      {/* Top Header */}
      <header className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs text-[#64748B] flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#D4A72C]" />
          <span>Faculty & Staff Administration</span>
        </span>
      </header>

      {/* Main Faculty Card */}
      <div className="max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border-t-4 border-t-[#D4A72C] border-x border-b border-[#0B1F3A]/10 p-6 sm:p-8 shadow-md">
          
          {/* Visual Identity for Faculty */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center mb-3 shadow-md shadow-[#0B1F3A]/15">
              <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1F3A]/8 text-[#0B1F3A] text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <KeyRound className="w-3 h-3 text-[#D4A72C]" />
              <span>Administrative Coordinator Console</span>
            </div>

            <h1 className="text-2xl font-extrabold text-[#0B1F3A]">
              Faculty Login
            </h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xs">
              Manage departmental events, authorize student capacities, and oversee university venue allocations.
            </p>
          </div>

          {/* Quick Demo Assist Banner */}
          <div className="mb-6 p-3 bg-[#0B1F3A]/5 border border-[#0B1F3A]/15 rounded-xl flex items-center justify-between gap-2">
            <div className="text-[11px] text-[#0B1F3A] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span>Demo Faculty: Dr. Robert Vance</span>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Faculty Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="e.g. r.vance@campus.edu"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
              autoComplete="email"
            />

            <FormInput
              label="Coordinator Password"
              isPassword
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="Enter your administrative password"
              icon={<Lock className="w-4 h-4" />}
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#0B1F3A]/20 text-[#0B1F3A] focus:ring-[#D4A72C] w-4 h-4"
                />
                <span className="text-[#64748B] font-medium">Remember terminal</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Faculty password recovery token dispatched to institutional IT department.')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#D4A72C] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold tracking-wide transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
              <span>{isLoading ? 'Authorizing...' : 'Authorize & Sign In as Faculty'}</span>
            </button>
          </form>

          {/* Switch to Student */}
          <div className="mt-6 pt-5 border-t border-[#0B1F3A]/8 text-center">
            <p className="text-xs text-[#64748B]">
              Looking for student registration or event enrollment?
            </p>
            <Link
              to="/student/login"
              className="inline-block mt-1 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C]"
            >
              Switch to Student Portal →
            </Link>
          </div>

        </div>
      </div>

      <footer className="py-4 text-center text-xs text-[#64748B]">
        <span>Campus Event Management System · Faculty Administrative Operations</span>
      </footer>
    </div>
  );
};
