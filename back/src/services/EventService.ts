import { EventRepository } from '../data/repositories/EventRepository';
import { Event } from '../entities/Event';
import type { CreateEventDTO } from '../presentation/dtos/CreateEventDTO';

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  async create(organizerId: number, data: CreateEventDTO) {
    const { name, description, startTime, endTime, location, imageUrl, totalSpots, categoryNames } = data;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid dates');
    }

    if (start > end) {
      throw new Error('Start time must be before end time');
    }

    const eventData = {
      organizerId,
      name,
      description,
      startTime: start,
      endTime: end,
      location,
      imageUrl,
      totalSpots,
    };

    return await this.eventRepository.save(new Event(eventData), categoryNames);
  }

  async getOrganizedEvents(organizerId: number) {
    return await this.eventRepository.findByOrganizer(organizerId);
  }

  async delete(id: number, userId: number) {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== userId) {
      throw new Error('You do not have permission to delete this event');
    }

    await this.eventRepository.delete(id);
  }

  async list() {
    return await this.eventRepository.findAll();
  }

  async getEvent(id: number) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async search(filters: {
    query?: string;
    location?: string;
    categories?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { query, location, categories, startDate, endDate } = filters;

    const parsedFilters: any = {
      query,
      location,
    };

    if (categories) {
      parsedFilters.categories = categories.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id));
    }

    if (startDate) {
      const d = new Date(startDate);
      if (!isNaN(d.getTime())) parsedFilters.startDate = d;
    }

    if (endDate) {
      const d = new Date(endDate);
      if (!isNaN(d.getTime())) parsedFilters.endDate = d;
    }

    return await this.eventRepository.search(parsedFilters);
  }
}
