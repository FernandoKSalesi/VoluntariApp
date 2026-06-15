import type { Request, Response } from 'express';
import { EventRatingService } from '../../services/EventRatingService';

export class EventRatingController {
  private eventRatingService: EventRatingService;

  constructor() {
    this.eventRatingService = new EventRatingService();
  }

  async rateEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;
      const userId = req.userId;

      const eventRating = await this.eventRatingService.rateEvent(Number(id), userId, rating, comment);
      res.status(201).json(eventRating);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEventRatings(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const data = await this.eventRatingService.getEventRatings(Number(id), userId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
