import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, ShieldCheck, Menu, X, ArrowRight, UserCircle, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#0B1F3A] border-b border-[#0B1F3A]/20 sticky top-0 z-40 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Brand Wordmark / Crest */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#D4A72C] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A72C] to-[#B88F20] flex items-center justify-center text-[#0B1F3A] shadow-md shadow-[#D4A72C]/10 shrink-0">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
                CAMPUS<span className="text-[#D4A72C]">EVENTS</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-300">
                Institutional Portal
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            <Link
              to="/"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/')
                  ? 'text-[#D4A72C] border-[#D4A72C]'
                  : 'text-slate-200 hover:text-white border-transparent'
              }`}
            >
              Home
            </Link>
            <Link
              to="/student/events"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/student/events')
                  ? 'text-[#D4A72C] border-[#D4A72C]'
                  : 'text-slate-200 hover:text-white border-transparent'
              }`}
            >
              Browse Events
            </Link>
            <a
              href="#about"
              className="text-slate-200 hover:text-white transition-colors py-1 border-b-2 border-transparent"
            >
              About
            </a>
            <a
              href="#categories"
              className="text-slate-200 hover:text-white transition-colors py-1 border-b-2 border-transparent"
            >
              Categories
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Student Login, Faculty Login OR User Menu) */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  to={role === 'student' ? '/student/dashboard' : '/faculty/dashboard'}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D4A72C] text-[#0B1F3A] text-xs font-bold hover:bg-[#B88F20] transition-colors shadow-xs"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{currentUser.name.split(' ')[0]} ({role === 'student' ? 'Student' : 'Faculty'})</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/student/login"
                  className="px-4 py-2 rounded-lg bg-[#D4A72C] hover:bg-[#B88F20] text-[#0B1F3A] text-xs font-bold tracking-wide transition-all shadow-xs flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Login</span>
                </Link>
                <Link
                  to="/faculty/login"
                  className="px-4 py-2 rounded-lg border border-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0B1F3A] text-[#D4A72C] text-xs font-bold tracking-wide transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Faculty Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071426] border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Home
          </Link>
          <Link
            to="/student/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Browse Events
          </Link>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link
                  to={role === 'student' ? '/student/dashboard' : '/faculty/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-[#D4A72C] text-[#0B1F3A] text-xs font-bold"
                >
                  Open Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-lg border border-red-400 text-red-300 text-xs font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/student/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-[#D4A72C] text-[#0B1F3A] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  Student Login
                </Link>
                <Link
                  to="/faculty/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-[#D4A72C] text-[#D4A72C] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Faculty Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
