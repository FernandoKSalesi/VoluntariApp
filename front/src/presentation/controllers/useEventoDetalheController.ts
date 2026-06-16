import { useState, useEffect } from "react";
import type { Event } from "@/domain/models/Event";
import { EventRepository } from "@/data/repositories/EventRepository";
import { ApiClient } from "@/data/services/ApiClient";

const eventRepository = new EventRepository();

export function useEventoDetalheController(id: number) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await eventRepository.getEventById(id);
        setEvent(data);
        
        // Check subscription if logged in
        if (localStorage.getItem("token")) {
          const subRes = await ApiClient.get(`/events/${id}/check-subscription`);
          setIsSubscribed(subRes.isSubscribed);
        }
      } catch (err) {
        setError("Erro ao carregar evento");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSubscribe = async () => {
    if (!localStorage.getItem("token")) {
      setError("Você precisa estar logado para se inscrever.");
      return;
    }
    try {
      setSubscribing(true);
      if (isSubscribed) {
        await ApiClient.delete(`/events/${id}/subscription`);
        setIsSubscribed(false);
        if (event) {
          setEvent({...event, inscritos: (event.inscritos || 1) - 1});
        }
      } else {
        await ApiClient.post(`/events/${id}/subscribe`, {});
        setIsSubscribed(true);
        if (event) {
          setEvent({...event, inscritos: (event.inscritos || 0) + 1});
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar inscrição.");
    } finally {
      setSubscribing(false);
    }
  };

  return {
    event,
    loading,
    error,
    isSubscribed,
    subscribing,
    handleSubscribe
  };
}
