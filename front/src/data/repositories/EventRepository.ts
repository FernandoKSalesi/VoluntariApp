import type { Event } from "../../domain/models/Event";
import type { IEventRepository } from "../../domain/repositories/IEventRepository";
import { ApiClient } from "../services/ApiClient";
import { getImageUrl } from "../../utils/imageUtils";

export class EventRepository implements IEventRepository {
  async getEvents(): Promise<Event[]> {
    const response = await ApiClient.get("/events");
    
    // Map response if necessary. Usually the DB might have camelCase or snake_case
    return response.map((item: any) => this.mapToDomain(item));
  }

  async getEventById(id: number): Promise<Event | null> {
    try {
      const response = await ApiClient.get(`/events/${id}`);
      return this.mapToDomain(response);
    } catch (e) {
      return null;
    }
  }

  private mapToDomain(item: any): Event {
    return {
      id: item.id,
      rawStartTime: item.startTime,
      title: item.name || item.title,
      descricao: item.description || "",
      date: new Date(item.startTime).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: 'numeric' }),
      horario: new Date(item.startTime).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
      location: item.location || "",
      vagas: item.totalSpots || 0,
      inscritos: item._count?.subscriptions || 0,
      image: getImageUrl(item.imageUrl),
      categoria: item.categories?.[0]?.category?.name || "Geral",
      organizador: item.organizer?.name || "Organizador",
      atividades: ["Apresentação do evento", "Atividade principal", "Encerramento"],
      requisitos: ["Roupa confortável", "Garrafa de água", "Disposição"]
    };
  }
}
