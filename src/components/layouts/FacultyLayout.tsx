import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Users2,
  UserCog,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const FacultyLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/faculty/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Manage Events', path: '/faculty/events', icon: CalendarDays },
    { label: 'Add Event', path: '/faculty/events/add', icon: PlusCircle },
    { label: 'Profile', path: '/faculty/profile', icon: UserCog },
  ];

  // Derive breadcrumb from current route
  const getBreadcrumb = () => {
    if (location.pathname === '/faculty/dashboard') return 'Faculty Administration / Overview';
    if (location.pathname === '/faculty/events') return 'Faculty Administration / Event Roster';
    if (location.pathname === '/faculty/events/add') return 'Faculty Administration / Event Scheduling Form';
    if (location.pathname.startsWith('/faculty/events/edit')) return 'Faculty Administration / Modify Event';
    if (location.pathname.includes('/registrations')) return 'Faculty Administration / Student Registrations';
    if (location.pathname === '/faculty/profile') return 'Faculty Administration / Coordinator Profile';
    return 'Faculty Administration';
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row">
      
      {/* Desktop Persistent Sidebar (Navy Blue #0B1F3A) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0B1F3A] text-white shrink-0 border-r border-[#0B1F3A]/30">
        
        {/* Sidebar Brand Header */}
        <div className="h-20 px-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#D4A72C] flex items-center justify-center text-[#0B1F3A] font-bold shadow-md shadow-[#D4A72C]/10 shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white leading-tight">
              CAMPUS<span className="text-[#D4A72C]">EVENTS</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-300">
              Faculty Command
            </span>
          </div>
        </div>

        {/* Coordinator Identity Badge */}
        <div className="p-4 mx-4 my-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/50 flex items-center justify-center text-[#D4A72C] font-bold text-sm overflow-hidden shrink-0">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="Faculty" className="w-full h-full object-cover" />
            ) : (
              'FC'
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">
              {currentUser?.name || 'Dr. Robert Vance'}
            </p>
            <p className="text-[10px] text-[#D4A72C] truncate font-medium">
              Event Coordinator
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 flex-1 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Operations Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/faculty/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#D4A72C] text-[#0B1F3A] shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Public Portal Switch & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/student/events"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-xs transition-colors"
          >
            <span>View Student Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-300 hover:text-white hover:bg-red-500/20 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Coordinator Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 sm:h-20 bg-white border-b border-[#0B1F3A]/8 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          
          {/* Mobile menu toggle & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-[#0B1F3A] hover:bg-[#0B1F3A]/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <span className="text-[#0B1F3A] font-bold">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-3">
            <Link
              to="/faculty/events/add"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold transition-all shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#D4A72C]" />
              <span>Create New Event</span>
            </Link>
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-bold text-[#0B1F3A] block">
                University Academic Term 2026
              </span>
              <span className="text-[10px] text-[#198754] font-semibold flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#198754]" />
                Event Portal Active
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-[#071426]/60 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 bg-[#0B1F3A] text-white flex flex-col p-4 shadow-2xl z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
                  <span className="font-bold text-sm">Faculty Console</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      end={item.path === '/faculty/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#D4A72C] text-[#0B1F3A]'
                            : 'text-slate-200 hover:bg-white/10'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-400 text-red-300 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Outlet for Faculty Pages */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
