import type { Request, Response } from 'express';
import { NotificationService } from '../../services/NotificationService';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async sendEventMessage(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const { message, subject } = req.body;
      const userId = req.userId;

      const sentCount = await this.notificationService.sendEventMessage(Number(eventId), userId, message, subject);
      res.status(200).json({ message: 'Mensagens enviadas com sucesso', sentCount });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const notifications = await this.notificationService.getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.notificationService.markAsRead(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async markAllAsRead(req: Request, res: Response) {
    try {
      const userId = req.userId;
      await this.notificationService.markAllAsRead(userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
