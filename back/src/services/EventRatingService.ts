import { EventRatingRepository } from '../data/repositories/EventRatingRepository';
import { EventRepository } from '../data/repositories/EventRepository';
import { EventRating } from '../entities/EventRating';

export class EventRatingService {
  private eventRatingRepository: EventRatingRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.eventRatingRepository = new EventRatingRepository();
    this.eventRepository = new EventRepository();
  }

  async rateEvent(eventId: number, userId: number, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    //TODO: Verificar se o usuário participou do evento antes de permitir avaliar --- IGNORE ---
    
    let eventRating = await this.eventRatingRepository.findByUserAndEvent(userId, eventId);
    
    if (eventRating) {
      eventRating.rating = rating;
      eventRating.comment = comment ?? null;
      return await this.eventRatingRepository.save(eventRating);
    } else {
      eventRating = new EventRating({
        eventId,
        userId,
        rating,
        comment: comment ?? null,
      });
      return await this.eventRatingRepository.save(eventRating);
    }
  }

  async getEventRatings(eventId: number, userId: number) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== userId) {
      throw new Error('Only the organizer can view these ratings');
    }

    const ratings = await this.eventRatingRepository.findByEventId(eventId);
    
    let average = 0;
    const comments: string[] = [];

    if (ratings.length > 0) {
      const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      average = sum / ratings.length;

      ratings.forEach(r => {
        if (r.comment) comments.push(r.comment);
      });
    }

    return {
      average,
      total: ratings.length,
      ratings,
      comments,
    };
  }
}
