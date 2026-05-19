import { useState, useEffect } from "react";
import type { Event } from "@/domain/models/Event";
import { EventRepositoryMock } from "@/data/repositories/EventRepositoryMock";

const eventRepository = new EventRepositoryMock();

export function useLandingPageController() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await eventRepository.getEvents();
        // Apenas os 3 primeiros
        setFeaturedEvents(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return {
    featuredEvents,
    loading
  };
}
