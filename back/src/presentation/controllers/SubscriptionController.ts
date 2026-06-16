import type { Request, Response } from 'express';
import { SubscriptionService } from '../../services/SubscriptionService';

export class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  async subscribe(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const subscription = await this.subscriptionService.subscribe(userId, Number(eventId));
      return res.status(201).json(subscription);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async unsubscribe(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      await this.subscriptionService.unsubscribe(userId, Number(eventId));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(200).json({ subscribed: false });
      }

      const subscribed = await this.subscriptionService.isSubscribed(userId, Number(eventId));
      return res.json({ subscribed });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getEventParticipants(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const organizerId = req.userId;

      if (!organizerId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const participants = await this.subscriptionService.getEventParticipants(Number(eventId), organizerId);
      return res.json(participants);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
