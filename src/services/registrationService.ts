import apiClient from './api';
import { EventRegistration, User } from '../types';
import { INITIAL_REGISTRATIONS, SAMPLE_STUDENTS } from '../data/sampleData';

/**
 * =========================================================================
 * REGISTRATION SERVICE (Spring Boot Ready)
 * =========================================================================
 * Corresponding Spring Boot Controllers:
 * - @RestController @RequestMapping("/api/registrations")
 *   - @GetMapping("/student/{studentId}") -> List<EventRegistration>
 *   - @GetMapping("/event/{eventId}") -> List<EventRegistration>
 *   - @PostMapping -> EventRegistration
 *   - @PutMapping("/{id}/cancel") -> EventRegistration
 * =========================================================================
 */

export const registrationService = {
  // Get all registrations for a student
  async getStudentRegistrations(studentId: string): Promise<EventRegistration[]> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.get<EventRegistration[]>(`/registrations/student/${studentId}`);
    // return response.data;

    const stored = localStorage.getItem('cems_registrations_data');
    if (stored) {
      try {
        const all: EventRegistration[] = JSON.parse(stored);
        return all.filter((r) => r.studentId === studentId);
      } catch {
        return INITIAL_REGISTRATIONS;
      }
    }
    localStorage.setItem('cems_registrations_data', JSON.stringify(INITIAL_REGISTRATIONS));
    return INITIAL_REGISTRATIONS;
  },

  // Get all registered students for a particular event (Faculty view)
  async getEventRegistrations(eventId: string, eventTitle?: string): Promise<EventRegistration[]> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.get<EventRegistration[]>(`/registrations/event/${eventId}`);
    // return response.data;

    const stored = localStorage.getItem('cems_registrations_data');
    let allRegistrations: EventRegistration[] = [];
    if (stored) {
      try {
        allRegistrations = JSON.parse(stored);
      } catch {
        allRegistrations = INITIAL_REGISTRATIONS;
      }
    } else {
      allRegistrations = INITIAL_REGISTRATIONS;
      localStorage.setItem('cems_registrations_data', JSON.stringify(INITIAL_REGISTRATIONS));
    }

    // Filter registrations specifically for this event
    const eventSpecific = allRegistrations.filter((r) => r.eventId === eventId);

    // If event has few registrations, supplement with realistic sample students for demo
    if (eventSpecific.length <= 1) {
      const demoList: EventRegistration[] = SAMPLE_STUDENTS.map((s, idx) => ({
        id: `reg-${eventId}-${idx + 1}`,
        eventId,
        eventTitle: eventTitle || 'Campus Event',
        eventDate: '2026-10-14',
        eventTime: '09:00 AM',
        eventVenue: 'Campus Main Pavilion',
        studentId: `std_${idx + 1}`,
        studentName: s.name,
        studentEmail: s.email,
        studentPhone: s.phone,
        registrationDate: s.regDate,
        status: s.status,
      }));
      return demoList;
    }

    return eventSpecific;
  },

  // Register student for an event
  async registerForEvent(
    event: { id: string; title: string; date: string; time: string; venue: string },
    student: User
  ): Promise<EventRegistration> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.post<EventRegistration>('/registrations', {
    //   eventId: event.id,
    //   studentId: student.id
    // });
    // return response.data;

    const stored = localStorage.getItem('cems_registrations_data');
    let list: EventRegistration[] = stored ? JSON.parse(stored) : INITIAL_REGISTRATIONS;

    // Check if already registered
    const existing = list.find((r) => r.eventId === event.id && r.studentId === student.id && r.status === 'Registered');
    if (existing) {
      throw new Error('You are already registered for this event');
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newReg: EventRegistration = {
      id: 'reg-' + Date.now().toString().slice(-4),
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      studentPhone: student.phone,
      registrationDate: todayStr,
      status: 'Registered',
    };

    list = [newReg, ...list];
    localStorage.setItem('cems_registrations_data', JSON.stringify(list));

    // Also update registeredCount in events
    const eventsStored = localStorage.getItem('cems_events_data');
    if (eventsStored) {
      try {
        const events = JSON.parse(eventsStored);
        const targetEvt = events.find((e: any) => e.id === event.id);
        if (targetEvt) {
          targetEvt.registeredCount = (targetEvt.registeredCount || 0) + 1;
          if (targetEvt.registeredCount >= targetEvt.capacity) {
            targetEvt.status = 'Event Full';
          }
          localStorage.setItem('cems_events_data', JSON.stringify(events));
        }
      } catch (e) {
        console.error(e);
      }
    }

    return newReg;
  },

  // Cancel an existing registration
  async cancelRegistration(registrationId: string): Promise<void> {
    // TODO: Connect to Spring Boot backend:
    // await apiClient.put(`/registrations/${registrationId}/cancel`);

    const stored = localStorage.getItem('cems_registrations_data');
    if (stored) {
      const list: EventRegistration[] = JSON.parse(stored);
      const target = list.find((r) => r.id === registrationId);
      if (target) {
        target.status = 'Cancelled';
        localStorage.setItem('cems_registrations_data', JSON.stringify(list));

        // Decrement event count
        const eventsStored = localStorage.getItem('cems_events_data');
        if (eventsStored) {
          try {
            const events = JSON.parse(eventsStored);
            const evt = events.find((e: any) => e.id === target.eventId);
            if (evt && evt.registeredCount > 0) {
              evt.registeredCount -= 1;
              if (evt.status === 'Event Full' && evt.registeredCount < evt.capacity) {
                evt.status = 'Registration Open';
              }
              localStorage.setItem('cems_events_data', JSON.stringify(events));
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
};
