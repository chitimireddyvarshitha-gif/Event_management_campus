import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { EventCard } from '../components/common/EventCard';
import { useEvents } from '../context/EventContext';
import {
  GraduationCap,
  ShieldCheck,
  CalendarCheck2,
  Users2,
  Trophy,
  ArrowRight,
  Sparkles,
  BookOpen,
  Cpu,
  Palette,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { events, isLoadingEvents } = useEvents();

  // Highlight first 3-4 upcoming open events
  const previewEvents = events.slice(0, 4);

  const categories = [
    {
      name: 'Technical',
      icon: Cpu,
      desc: 'Hackathons, Robotics Showcases & AI Keynotes',
      count: events.filter((e) => e.category === 'Technical').length,
    },
    {
      name: 'Cultural',
      icon: Palette,
      desc: 'Music Fests, Theatrical Shows & Fine Arts Salons',
      count: events.filter((e) => e.category === 'Cultural').length,
    },
    {
      name: 'Sports',
      icon: Trophy,
      desc: 'Athletics, Inter-College Leagues & Finals',
      count: events.filter((e) => e.category === 'Sports').length,
    },
    {
      name: 'Academic',
      icon: BookOpen,
      desc: 'Research Symposia, Placements & Workshops',
      count: events.filter((e) => e.category === 'Academic').length,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#0B1F3A] text-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-[#0B1F3A]/30">
        
        {/* Subtle geometric pattern & glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4A72C_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4A72C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-[#D4A72C] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Collegiate Portal & Coordination Hub</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                CAMPUS EVENT <br />
                <span className="text-[#D4A72C]">MANAGEMENT SYSTEM</span>
              </h1>

              {/* Decorative Gold Line */}
              <div className="w-20 h-1 bg-[#D4A72C] rounded-full" />

              <p className="text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed">
                Discover. Participate. Experience. The official collegiate platform uniting students and faculty for seamless campus life, certified workshops, and collegiate competitions.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/student/login"
                  className="px-6 py-3.5 rounded-xl bg-[#D4A72C] hover:bg-[#B88F20] text-[#0B1F3A] font-extrabold text-sm tracking-wide transition-all shadow-md shadow-[#D4A72C]/20 flex items-center gap-2 group cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-[#0B1F3A]" />
                  <span>Student Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/faculty/login"
                  className="px-6 py-3.5 rounded-xl border-2 border-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0B1F3A] text-white font-bold text-sm tracking-wide transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D4A72C] group-hover:text-[#0B1F3A] transition-colors" />
                  <span>Faculty Login</span>
                </Link>
              </div>

              {/* Ticker Points */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C]" />
                  <span>Verified Student Badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C]" />
                  <span>Real-Time Seat Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C]" />
                  <span>Automated Rosters</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4A72C]/30 shadow-2xl bg-[#071426] group">
                <img
                  src="/src/assets/images/hero_campus_portal_1790559781450.jpg"
                  alt="University Campus Quad"
                  className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-[#071426]/30 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0B1F3A]/85 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#D4A72C] font-bold uppercase tracking-wider">
                      Live Campus Operations
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Term
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    50+ Annual Flagship Events & Competitions
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Centralized venue reservations and attendance certification.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Institutional Metrics Strip */}
      <section className="bg-white border-b border-[#0B1F3A]/8 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-2 border-r last:border-0 border-[#0B1F3A]/8">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tabular-nums">
                2,400+
              </p>
              <p className="text-xs font-semibold text-[#64748B] mt-1">
                Student Enrollees
              </p>
            </div>
            <div className="p-2 border-r last:border-0 border-[#0B1F3A]/8">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tabular-nums">
                100%
              </p>
              <p className="text-xs font-semibold text-[#64748B] mt-1">
                Verified Registrations
              </p>
            </div>
            <div className="p-2 border-r last:border-0 border-[#0B1F3A]/8">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tabular-nums">
                36+
              </p>
              <p className="text-xs font-semibold text-[#64748B] mt-1">
                Collegiate Departments
              </p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tabular-nums">
                12
              </p>
              <p className="text-xs font-semibold text-[#64748B] mt-1">
                Campus Venues & Auditoriums
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview Section */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4A72C] uppercase tracking-wider mb-2">
              <CalendarCheck2 className="w-4 h-4" />
              <span>Campus Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Featured Upcoming Events
            </h2>
            <p className="text-sm text-[#64748B] mt-1 max-w-xl">
              Register early to guarantee reserved seating and participation kits.
            </p>
          </div>

          <Link
            to="/student/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] hover:text-[#D4A72C] transition-colors group"
          >
            <span>Browse All Campus Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* Event Categories Exploration */}
      <section id="categories" className="py-16 bg-[#0B1F3A]/3 border-y border-[#0B1F3A]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Diverse Collegiate Pillars
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Explore events across intellectual, cultural, athletic, and career pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="bg-white rounded-xl border border-[#0B1F3A]/8 p-6 shadow-xs hover:border-[#D4A72C] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-[#D4A72C] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-bold text-[#D4A72C] tabular-nums">
                      {cat.count} Events
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two Dedicated Experiences Showcase (Student vs Faculty) */}
      <section id="about" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
            Tailored Experiences for Our Campus
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Purpose-built interfaces designed specifically for student discovery and faculty administration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Experience */}
          <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-8 shadow-xs flex flex-col justify-between hover:border-[#D4A72C]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center mb-5">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                Student Experience
              </h3>
              <p className="text-xs font-semibold text-[#D4A72C] uppercase tracking-wider mb-4">
                Discovery & Participation
              </p>
              <ul className="space-y-3 text-xs text-[#64748B] mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0 mt-0.5" />
                  <span>Instant self-registration with live seat confirmation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0 mt-0.5" />
                  <span>Personal dashboard tracking active and completed registrations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0 mt-0.5" />
                  <span>Easy cancellation with single-click confirmation modals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#198754] shrink-0 mt-0.5" />
                  <span>Department and interest-based event recommendations</span>
                </li>
              </ul>
            </div>
            <Link
              to="/student/login"
              className="w-full py-3 rounded-xl bg-[#0B1F3A] hover:bg-[#071426] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Access Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />
            </Link>
          </div>

          {/* Faculty Experience */}
          <div className="bg-white rounded-2xl border border-[#0B1F3A]/8 p-8 shadow-xs flex flex-col justify-between hover:border-[#D4A72C]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center mb-5">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                Faculty & Coordinator Experience
              </h3>
              <p className="text-xs font-semibold text-[#D4A72C] uppercase tracking-wider mb-4">
                Governance & Capacity Management
              </p>
              <ul className="space-y-3 text-xs text-[#64748B] mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span>Administrative event scheduling, capacity limit caps, and venue booking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span>Live attendee rosters with student registration contact lists</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span>Event lifecycle management (Open, Edit, Cancel, Close, Complete)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span>Visual dashboard analytics tracking attendance ratios per category</span>
                </li>
              </ul>
            </div>
            <Link
              to="/faculty/login"
              className="w-full py-3 rounded-xl border border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white text-[#0B1F3A] text-xs font-bold text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Access Faculty Command</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-[#0B1F3A] text-white py-14 border-t border-[#0B1F3A]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Participate in Upcoming Campus Events?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of fellow students discovering cutting-edge hackathons, arts exhibitions, cultural fests, and athletic rivalries.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/student/register"
              className="px-6 py-3 rounded-xl bg-[#D4A72C] hover:bg-[#B88F20] text-[#0B1F3A] text-xs font-extrabold tracking-wide transition-all shadow-md"
            >
              Register Student Account
            </Link>
            <Link
              to="/student/events"
              className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-white text-xs font-bold transition-all"
            >
              Explore Public Schedule
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
