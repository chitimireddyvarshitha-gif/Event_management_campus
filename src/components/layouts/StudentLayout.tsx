import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { Footer } from '../common/Footer';
import {
  GraduationCap,
  LayoutDashboard,
  Compass,
  BookmarkCheck,
  UserCheck,
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { studentRegistrations } = useEvents();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeRegistrationsCount = studentRegistrations.filter((r) => r.status === 'Registered').length;

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Browse Events', path: '/student/events', icon: Compass },
    {
      label: 'My Registrations',
      path: '/student/registrations',
      icon: BookmarkCheck,
      badge: activeRegistrationsCount > 0 ? activeRegistrationsCount : undefined,
    },
    { label: 'Profile', path: '/student/profile', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA]">
      {/* Student Top Navigation Bar */}
      <header className="bg-[#0B1F3A] text-white sticky top-0 z-40 border-b border-[#0B1F3A]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Student Brand Lockup */}
            <div className="flex items-center gap-6">
              <Link to="/student/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4A72C] flex items-center justify-center text-[#0B1F3A] shadow-md shadow-[#D4A72C]/10 font-bold shrink-0">
                  <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                    CAMPUS<span className="text-[#D4A72C]">EVENTS</span>
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-300">
                    Student Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#D4A72C] text-[#0B1F3A] shadow-xs'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="ml-1 px-1.5 py-0.2 bg-[#0B1F3A] text-[#D4A72C] text-[10px] font-bold rounded-full border border-[#D4A72C]/30 tabular-nums">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* User Profile Snippet & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 pl-4 border-l border-white/15">
                <div className="w-9 h-9 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] font-bold text-xs uppercase overflow-hidden">
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
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white line-clamp-1 max-w-[130px]">
                    {currentUser?.name || 'Varshitha'}
                  </span>
                  <span className="text-[10px] text-slate-300 font-medium">
                    Student
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#071426] border-t border-white/10 px-4 pt-3 pb-5 space-y-2">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A72C] text-[#0B1F3A] font-bold flex items-center justify-center text-sm">
                {currentUser?.name.charAt(0) || 'S'}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-400">{currentUser?.email}</p>
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#D4A72C] text-[#0B1F3A]'
                        : 'text-slate-200 hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-[#0B1F3A] text-[#D4A72C] text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-400 text-red-300 text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Student Content Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
