import { useState, useEffect } from "react";
import type { Event } from "@/domain/models/Event";
import { EventRepositoryMock } from "@/data/repositories/EventRepositoryMock";

// Injeção de dependência rudimentar, idealmente passaria via context
const eventRepository = new EventRepositoryMock();

export function useEventosController() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await eventRepository.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return {
    events,
    loading
  };
}
