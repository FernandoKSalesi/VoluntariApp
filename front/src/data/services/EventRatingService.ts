import { ApiClient } from "./ApiClient";

export interface EventRatingPayload {
  rating: number; // Média das 3 notas (arredondada)
  comment: string; // Comentário do usuário
}

export interface EventRatingResponse {
  id: number;
  eventId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GetRatingsResponse {
  average: number;
  total: number;
  ratings: EventRatingResponse[];
  comments: string[];
}

export class EventRatingService {
  static async rateEvent(eventId: number, payload: EventRatingPayload): Promise<EventRatingResponse> {
    return ApiClient.post(`/events/${eventId}/ratings`, payload);
  }

  static async getEventRatings(eventId: number): Promise<GetRatingsResponse> {
    return ApiClient.get(`/events/${eventId}/ratings`);
  }
}
