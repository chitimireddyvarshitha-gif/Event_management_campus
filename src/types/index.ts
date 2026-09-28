export type UserRole = 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  department: string;
  year?: string; // for students (e.g. "3rd Year (Junior)")
  designation?: string; // for faculty (e.g. "Associate Dean of Student Activities")
  avatar?: string;
}

export type EventCategory = 'Technical' | 'Cultural' | 'Sports' | 'Academic' | 'Other';

export type EventStatus = 
  | 'Upcoming' 
  | 'Registration Open' 
  | 'Registration Closed' 
  | 'Event Full' 
  | 'Completed' 
  | 'Cancelled';

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:30 AM"
  venue: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  deadline: string; // YYYY-MM-DD
  imageUrl: string;
  status: EventStatus;
}

export type RegistrationStatus = 'Registered' | 'Cancelled' | 'Completed';

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  registrationDate: string;
  status: RegistrationStatus;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
