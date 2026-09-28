import apiClient from './api';
import { CampusEvent, EventCategory } from '../types';
import { INITIAL_EVENTS } from '../data/sampleData';

/**
 * =========================================================================
 * EVENT SERVICE (Spring Boot Ready)
 * =========================================================================
 * Corresponding Spring Boot Controllers:
 * - @RestController @RequestMapping("/api/events")
 *   - @GetMapping -> List<CampusEvent>
 *   - @GetMapping("/{id}") -> CampusEvent
 *   - @GetMapping("/category/{category}") -> List<CampusEvent>
 *   - @PostMapping -> CampusEvent
 *   - @PutMapping("/{id}") -> CampusEvent
 *   - @DeleteMapping("/{id}") -> ResponseEntity<Void>
 * =========================================================================
 */

export const eventService = {
  // Fetch all events
  async getAllEvents(): Promise<CampusEvent[]> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.get<CampusEvent[]>('/events');
    // return response.data;

    const stored = localStorage.getItem('cems_events_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return INITIAL_EVENTS;
      }
    }
    localStorage.setItem('cems_events_data', JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  },

  // Fetch single event by ID
  async getEventById(id: string): Promise<CampusEvent | null> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.get<CampusEvent>(`/events/${id}`);
    // return response.data;

    const events = await this.getAllEvents();
    return events.find((e) => e.id === id) || null;
  },

  // Create new event (Faculty action)
  async createEvent(eventData: Omit<CampusEvent, 'id' | 'registeredCount'>): Promise<CampusEvent> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.post<CampusEvent>('/events', eventData);
    // return response.data;

    const events = await this.getAllEvents();
    const newEvent: CampusEvent = {
      ...eventData,
      id: 'evt-' + String(Date.now()).slice(-4),
      registeredCount: 0,
    };
    const updated = [newEvent, ...events];
    localStorage.setItem('cems_events_data', JSON.stringify(updated));
    return newEvent;
  },

  // Update existing event (Faculty action)
  async updateEvent(id: string, updates: Partial<CampusEvent>): Promise<CampusEvent> {
    // TODO: Connect to Spring Boot backend:
    // const response = await apiClient.put<CampusEvent>(`/events/${id}`, updates);
    // return response.data;

    const events = await this.getAllEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }
    const updatedEvent = { ...events[index], ...updates };
    events[index] = updatedEvent;
    localStorage.setItem('cems_events_data', JSON.stringify(events));
    return updatedEvent;
  },

  // Delete event (Faculty action)
  async deleteEvent(id: string): Promise<void> {
    // TODO: Connect to Spring Boot backend:
    // await apiClient.delete(`/events/${id}`);

    const events = await this.getAllEvents();
    const filtered = events.filter((e) => e.id !== id);
    localStorage.setItem('cems_events_data', JSON.stringify(filtered));
  }
};
