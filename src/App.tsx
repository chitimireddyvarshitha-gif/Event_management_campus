import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Layouts & Guards
import { StudentLayout } from './components/layouts/StudentLayout';
import { FacultyLayout } from './components/layouts/FacultyLayout';
import { StudentRoute, FacultyRoute } from './components/routing/RouteGuards';

// Public & Auth Pages
import { LandingPage } from './pages/LandingPage';
import { StudentLogin } from './pages/student/StudentLogin';
import { StudentRegister } from './pages/student/StudentRegister';
import { FacultyLogin } from './pages/faculty/FacultyLogin';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentEvents } from './pages/student/StudentEvents';
import { StudentEventDetails } from './pages/student/StudentEventDetails';
import { StudentRegistrations } from './pages/student/StudentRegistrations';
import { StudentProfile } from './pages/student/StudentProfile';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyManageEvents } from './pages/faculty/FacultyManageEvents';
import { FacultyAddEvent } from './pages/faculty/FacultyAddEvent';
import { FacultyEditEvent } from './pages/faculty/FacultyEditEvent';
import { FacultyRegisteredStudents } from './pages/faculty/FacultyRegisteredStudents';
import { FacultyProfile } from './pages/faculty/FacultyProfile';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <EventProvider>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Student Auth */}
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/register" element={<StudentRegister />} />

              {/* Student Experience (within StudentLayout) */}
              <Route
                path="/student"
                element={
                  <StudentRoute>
                    <StudentLayout />
                  </StudentRoute>
                }
              >
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="events" element={<StudentEvents />} />
                <Route path="events/:id" element={<StudentEventDetails />} />
                <Route path="registrations" element={<StudentRegistrations />} />
                <Route path="profile" element={<StudentProfile />} />
              </Route>

              {/* Faculty Auth */}
              <Route path="/faculty/login" element={<FacultyLogin />} />

              {/* Faculty Experience (within FacultyLayout with Sidebar) */}
              <Route
                path="/faculty"
                element={
                  <FacultyRoute>
                    <FacultyLayout />
                  </FacultyRoute>
                }
              >
                <Route index element={<Navigate to="/faculty/dashboard" replace />} />
                <Route path="dashboard" element={<FacultyDashboard />} />
                <Route path="events" element={<FacultyManageEvents />} />
                <Route path="events/add" element={<FacultyAddEvent />} />
                <Route path="events/edit/:id" element={<FacultyEditEvent />} />
                <Route path="events/:id/registrations" element={<FacultyRegisteredStudents />} />
                <Route path="profile" element={<FacultyProfile />} />
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </EventProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
