import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071426] text-white border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & College Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4A72C] flex items-center justify-center text-[#0B1F3A] shrink-0 font-bold">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white leading-tight block">
                  CAMPUS<span className="text-[#D4A72C]">EVENTS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                  University Portal
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Institutional platform for discovering, organizing, and certifying campus-wide conferences, hackathons, sports championships, and cultural celebrations.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4A72C]">
              <Award className="w-4 h-4 shrink-0" />
              <span>Accredited Academic Event Operations</span>
            </div>
          </div>

          {/* Col 2: Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A72C] mb-4">
              Access Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  to="/student/login"
                  className="hover:text-[#D4A72C] transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>Student Portal Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/student/register"
                  className="hover:text-[#D4A72C] transition-colors pl-5.5"
                >
                  Student Account Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/faculty/login"
                  className="hover:text-[#D4A72C] transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>Faculty Coordinator Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/student/events"
                  className="hover:text-[#D4A72C] transition-colors pl-5.5"
                >
                  Public Events Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A72C] mb-4">
              Collegiate Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Technical Hackathons & Summits</li>
              <li>Annual Cultural & Arts Festivals</li>
              <li>Inter-College Athletic Championships</li>
              <li>Academic Research Symposia</li>
              <li>Career & Placement Salons</li>
            </ul>
          </div>

          {/* Col 4: Campus Administration Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A72C] mb-4">
              Campus Administration
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                <span>Student Affairs & Event Directorate, Admin Block 4, University Campus</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A72C] shrink-0" />
                <span>events@campus.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A72C] shrink-0" />
                <span className="tabular-nums">+1 (555) 019-8400</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Campus Event Management System. All institutional rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Java Spring Boot + React Ready Architecture</span>
            <span className="text-[#D4A72C] font-semibold">Institutional Grade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
