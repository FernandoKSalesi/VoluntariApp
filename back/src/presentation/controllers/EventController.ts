import type { Request, Response } from 'express';
import { EventService } from '../../services/EventService';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, startTime, endTime, location, imageUrl, totalSpots, categoryNames } = req.body;
      const organizerId = req.userId;

      if (!organizerId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const event = await this.eventService.create(organizerId, {
        name,
        description,
        startTime,
        endTime,
        location,
        imageUrl,
        totalSpots: Number(totalSpots),
        categoryNames,
      });

      return res.status(201).json(event);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getOrganized(req: Request, res: Response) {
    try {
      const organizerId = req.userId;

      if (!organizerId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const events = await this.eventService.getOrganizedEvents(organizerId);
      return res.json(events);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      await this.eventService.delete(Number(id), userId);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { q, location, categories, startDate, endDate } = req.query;

      const events = await this.eventService.search({
        query: q as string,
        location: location as string,
        categories: categories as string,
        startDate: startDate as string,
        endDate: endDate as string,
      });

      return res.json(events);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }


  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const event = await this.eventService.getEvent(Number(id));
      return res.json(event);
    } catch (error: any) {
      if (error.message === 'Event not found') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, startTime, endTime, location, imageUrl, totalSpots, categoryNames } = req.body;
      const organizerId = req.userId;

      if (!organizerId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const event = await this.eventService.update(Number(id), organizerId, {
        name,
        description,
        startTime,
        endTime,
        location,
        imageUrl,
        totalSpots: totalSpots ? Number(totalSpots) : undefined,
        categoryNames,
      });

      return res.json(event);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
