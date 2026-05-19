import { useState, useEffect } from "react";
import type { Event } from "@/domain/models/Event";
import { EventRepositoryMock } from "@/data/repositories/EventRepositoryMock";

const eventRepository = new EventRepositoryMock();

export function useEventoDetalheController(id: number) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInscrito, setIsInscrito] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await eventRepository.getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  const toggleInscricao = () => {
    setIsInscrito(prev => !prev);
  };

  return {
    event,
    loading,
    isInscrito,
    toggleInscricao
  };
}
