import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CampusEvent, EventRegistration, User } from '../types';
import { eventService } from '../services/eventService';
import { registrationService } from '../services/registrationService';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

interface EventContextType {
  events: CampusEvent[];
  studentRegistrations: EventRegistration[];
  isLoadingEvents: boolean;
  refreshEvents: () => Promise<void>;
  getEventById: (id: string) => CampusEvent | undefined;
  registerForEvent: (event: CampusEvent) => Promise<boolean>;
  cancelRegistration: (registrationId: string) => Promise<boolean>;
  createEvent: (eventData: Omit<CampusEvent, 'id' | 'registeredCount'>) => Promise<boolean>;
  updateEvent: (id: string, updates: Partial<CampusEvent>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  isStudentRegistered: (eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [studentRegistrations, setStudentRegistrations] = useState<EventRegistration[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
  const { showToast } = useToast();
  const { currentUser } = useAuth();

  const refreshEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (e: any) {
      showToast('Failed to load campus events', 'error');
    } finally {
      setIsLoadingEvents(false);
    }
  }, [showToast]);

  const refreshRegistrations = useCallback(async () => {
    if (!currentUser || currentUser.role !== 'student') return;
    try {
      const regs = await registrationService.getStudentRegistrations(currentUser.id);
      setStudentRegistrations(regs);
    } catch (e: any) {
      console.error('Failed to load registrations', e);
    }
  }, [currentUser]);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  useEffect(() => {
    refreshRegistrations();
  }, [refreshRegistrations]);

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id);
  };

  const isStudentRegistered = (eventId: string) => {
    return studentRegistrations.some(
      (r) => r.eventId === eventId && r.status === 'Registered'
    );
  };

  const registerForEvent = async (event: CampusEvent): Promise<boolean> => {
    if (!currentUser) {
      showToast('Please sign in as a student to register.', 'warning');
      return false;
    }
    if (currentUser.role !== 'student') {
      showToast('Faculty accounts cannot register for student events.', 'warning');
      return false;
    }

    try {
      await registrationService.registerForEvent(
        {
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          venue: event.venue,
        },
        currentUser
      );
      showToast(`Successfully registered for "${event.title}"!`, 'success');
      await refreshEvents();
      await refreshRegistrations();
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Could not complete registration.', 'error');
      return false;
    }
  };

  const cancelRegistration = async (registrationId: string): Promise<boolean> => {
    try {
      await registrationService.cancelRegistration(registrationId);
      showToast('Registration has been successfully cancelled.', 'info');
      await refreshEvents();
      await refreshRegistrations();
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Failed to cancel registration.', 'error');
      return false;
    }
  };

  const createEvent = async (
    eventData: Omit<CampusEvent, 'id' | 'registeredCount'>
  ): Promise<boolean> => {
    try {
      await eventService.createEvent(eventData);
      showToast('Event created successfully!', 'success');
      await refreshEvents();
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Failed to create event.', 'error');
      return false;
    }
  };

  const updateEvent = async (id: string, updates: Partial<CampusEvent>): Promise<boolean> => {
    try {
      await eventService.updateEvent(id, updates);
      showToast('Event updated successfully!', 'success');
      await refreshEvents();
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Failed to update event.', 'error');
      return false;
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      await eventService.deleteEvent(id);
      showToast('Event deleted successfully.', 'info');
      await refreshEvents();
      return true;
    } catch (error: any) {
      showToast(error?.message || 'Failed to delete event.', 'error');
      return false;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        studentRegistrations,
        isLoadingEvents,
        refreshEvents,
        getEventById,
        registerForEvent,
        cancelRegistration,
        createEvent,
        updateEvent,
        deleteEvent,
        isStudentRegistered,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
