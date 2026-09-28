import { CampusEvent, EventRegistration, User } from '../types';

export const INITIAL_STUDENT: User = {
  id: 'std_01',
  name: 'Varshitha Chitimireddy',
  email: 'varshitha.c@campus.edu',
  role: 'student',
  phone: '+1 (555) 234-8901',
  department: 'Computer Science & Engineering',
  year: '3rd Year (Junior)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
};

export const INITIAL_FACULTY: User = {
  id: 'fac_01',
  name: 'Dr. Robert Vance',
  email: 'r.vance@campus.edu',
  role: 'faculty',
  phone: '+1 (555) 472-9102',
  department: 'School of Computing & Engineering',
  designation: 'Associate Dean of Student Activities & Event Coordinator',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
};

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-001',
    title: 'Campus Hackathon 2026',
    description: 'A 24-hour inter-collegiate coding marathon where students collaborate in multidisciplinary teams to engineer functional prototypes addressing campus sustainability, accessibility, and autonomous student services. Features mentoring sessions by industry engineering leads.',
    category: 'Technical',
    date: '2026-10-14',
    time: '09:00 AM',
    venue: 'Alan Turing Innovation Hub, Block C',
    organizer: 'Department of Computer Science & Engineering',
    capacity: 200,
    registeredCount: 178,
    deadline: '2026-10-10',
    imageUrl: '/src/assets/images/event_campus_hackathon_1790559795018.jpg',
    status: 'Registration Open'
  },
  {
    id: 'evt-002',
    title: 'Cultural Fest 2026 — Symphonia',
    description: 'The premier annual cultural extravaganza of the university celebrating music, performing arts, theatrical drama, and culinary traditions. Includes battle of the bands, classical dance showcases, and an evening headline concert.',
    category: 'Cultural',
    date: '2026-10-28',
    time: '05:00 PM',
    venue: 'University Grand Auditorium & Open Amphitheater',
    organizer: 'Campus Student Cultural Council',
    capacity: 800,
    registeredCount: 742,
    deadline: '2026-10-25',
    imageUrl: '/src/assets/images/event_cultural_fest_1790559807104.jpg',
    status: 'Registration Open'
  },
  {
    id: 'evt-003',
    title: 'AI & Future Technologies Summit',
    description: 'Keynote addresses, technical breakout tracks, and live demonstrations featuring university research fellows and artificial intelligence practitioners exploring neural network architectures, robotic vision, and ethics in automated decision-making.',
    category: 'Technical',
    date: '2026-11-05',
    time: '10:00 AM',
    venue: 'Sir C.V. Raman Memorial Hall',
    organizer: 'Center for Artificial Intelligence & Robotics',
    capacity: 350,
    registeredCount: 350,
    deadline: '2026-11-01',
    imageUrl: '/src/assets/images/event_tech_summit_1790559818879.jpg',
    status: 'Event Full'
  },
  {
    id: 'evt-004',
    title: 'Inter-College Cricket Tournament',
    description: 'The annual inter-collegiate cricket tournament featuring 16 university varsity teams competing across five days in T20 format for the Chancellor Championship Shield. Open to all students for cheer squad and match viewing.',
    category: 'Sports',
    date: '2026-11-12',
    time: '08:30 AM',
    venue: 'University Athletics Oval & Sports Complex',
    organizer: 'Directorate of Physical Education & Athletics',
    capacity: 500,
    registeredCount: 310,
    deadline: '2026-11-08',
    imageUrl: '/src/assets/images/event_sports_tournament_1790559831246.jpg',
    status: 'Registration Open'
  },
  {
    id: 'evt-005',
    title: 'Research Symposium on Sustainable Energy',
    description: 'Faculty-guided symposium on renewable power generation, grid stabilization, and next-generation battery chemistries. Student researchers present peer-reviewed poster sessions and paper presentations.',
    category: 'Academic',
    date: '2026-11-20',
    time: '09:30 AM',
    venue: 'Science Research & Conference Complex',
    organizer: 'Academic Research & Development Council',
    capacity: 180,
    registeredCount: 95,
    deadline: '2026-11-16',
    imageUrl: '/src/assets/images/hero_campus_portal_1790559781450.jpg',
    status: 'Registration Open'
  },
  {
    id: 'evt-006',
    title: 'Career Development & Industry Networking Workshop',
    description: 'Structured corporate engagement masterclass covering resume synthesis, technical interview simulation, salary negotiation strategies, and private networking salons with alumni recruiters.',
    category: 'Academic',
    date: '2026-12-02',
    time: '02:00 PM',
    venue: 'Placement & Career Advisory Center',
    organizer: 'Office of Career Advancement',
    capacity: 250,
    registeredCount: 250,
    deadline: '2026-11-28',
    imageUrl: '/src/assets/images/event_tech_summit_1790559818879.jpg',
    status: 'Event Full'
  },
  {
    id: 'evt-007',
    title: 'Annual Photography Contest & Exhibition',
    description: 'Juried photography exhibition showcasing student perspectives on urban architecture, wildlife, documentary storytelling, and experimental cyanotype printing. Guest curator judging with equipment grant prizes.',
    category: 'Cultural',
    date: '2026-12-10',
    time: '11:00 AM',
    venue: 'Fine Arts Gallery, Humanities Wing',
    organizer: 'Fine Arts Guild & Shutterbugs Society',
    capacity: 150,
    registeredCount: 88,
    deadline: '2026-12-05',
    imageUrl: '/src/assets/images/event_cultural_fest_1790559807104.jpg',
    status: 'Registration Open'
  },
  {
    id: 'evt-008',
    title: 'Collegiate Basketball Championship Finals',
    description: 'Varsity conference championship matchup between East Campus Panthers and North Hall Royals. Student spirit section passes include commemorative fan t-shirt and halftime showcase access.',
    category: 'Sports',
    date: '2026-12-15',
    time: '04:00 PM',
    venue: 'John Wooden Indoor Sports Pavilion',
    organizer: 'Campus Recreation & Intramurals',
    capacity: 400,
    registeredCount: 290,
    deadline: '2026-12-12',
    imageUrl: '/src/assets/images/event_sports_tournament_1790559831246.jpg',
    status: 'Registration Open'
  }
];

export const INITIAL_REGISTRATIONS: EventRegistration[] = [
  {
    id: 'reg-101',
    eventId: 'evt-001',
    eventTitle: 'Campus Hackathon 2026',
    eventDate: '2026-10-14',
    eventTime: '09:00 AM',
    eventVenue: 'Alan Turing Innovation Hub, Block C',
    studentId: 'std_01',
    studentName: 'Varshitha Chitimireddy',
    studentEmail: 'varshitha.c@campus.edu',
    studentPhone: '+1 (555) 234-8901',
    registrationDate: '2026-09-20',
    status: 'Registered'
  },
  {
    id: 'reg-102',
    eventId: 'evt-002',
    eventTitle: 'Cultural Fest 2026 — Symphonia',
    eventDate: '2026-10-28',
    eventTime: '05:00 PM',
    eventVenue: 'University Grand Auditorium & Open Amphitheater',
    studentId: 'std_01',
    studentName: 'Varshitha Chitimireddy',
    studentEmail: 'varshitha.c@campus.edu',
    studentPhone: '+1 (555) 234-8901',
    registrationDate: '2026-09-22',
    status: 'Registered'
  },
  {
    id: 'reg-103',
    eventId: 'evt-005',
    eventTitle: 'Research Symposium on Sustainable Energy',
    eventDate: '2026-11-20',
    eventTime: '09:30 AM',
    eventVenue: 'Science Research & Conference Complex',
    studentId: 'std_01',
    studentName: 'Varshitha Chitimireddy',
    studentEmail: 'varshitha.c@campus.edu',
    studentPhone: '+1 (555) 234-8901',
    registrationDate: '2026-09-25',
    status: 'Registered'
  }
];

export const SAMPLE_STUDENTS: { name: string; email: string; phone: string; regDate: string; status: 'Registered' | 'Cancelled' }[] = [
  { name: 'Varshitha Chitimireddy', email: 'varshitha.c@campus.edu', phone: '+1 (555) 234-8901', regDate: '2026-09-20', status: 'Registered' },
  { name: 'Aravind Swaminathan', email: 'a.swami@campus.edu', phone: '+1 (555) 345-6789', regDate: '2026-09-21', status: 'Registered' },
  { name: 'Elena Rostova', email: 'e.rostova@campus.edu', phone: '+1 (555) 987-1234', regDate: '2026-09-21', status: 'Registered' },
  { name: 'Marcus Sterling', email: 'm.sterling@campus.edu', phone: '+1 (555) 456-7890', regDate: '2026-09-22', status: 'Registered' },
  { name: 'Priya Sharma', email: 'p.sharma@campus.edu', phone: '+1 (555) 678-2345', regDate: '2026-09-22', status: 'Registered' },
  { name: 'Devon Lee', email: 'd.lee@campus.edu', phone: '+1 (555) 789-3456', regDate: '2026-09-23', status: 'Registered' },
  { name: 'Chloe Montgomery', email: 'c.mont@campus.edu', phone: '+1 (555) 890-4567', regDate: '2026-09-24', status: 'Cancelled' },
  { name: 'Tariq Al-Mansoor', email: 't.almansoor@campus.edu', phone: '+1 (555) 901-5678', regDate: '2026-09-24', status: 'Registered' }
];
