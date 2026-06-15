import { NotificationRepository } from '../data/repositories/NotificationRepository';
import { EventRepository } from '../data/repositories/EventRepository';
import { Notification } from '../entities/Notification';
import { prisma } from '../data/prisma/client';

export class NotificationService {
  private notificationRepository: NotificationRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
    this.eventRepository = new EventRepository();
  }

  async sendEventMessage(eventId: number, organizerId: number, message: string) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== organizerId) {
      throw new Error('Only the organizer can send messages to attendees');
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { eventId, status: 'CONFIRMED' },
      select: { userId: true }
    });

    if (subscriptions.length === 0) {
      return 0;
    }

    const notifications = subscriptions.map(sub => new Notification({
      eventId,
      userId: sub.userId,
      senderId: organizerId,
      title: `Nova mensagem de ${event.name}`,
      message,
      read: false
    }));

    await this.notificationRepository.createMany(notifications);
    return notifications.length;
  }

  async getUserNotifications(userId: number) {
    return await this.notificationRepository.findByUserId(userId);
  }

  async markAsRead(notificationId: number) {
    await this.notificationRepository.markAsRead(notificationId);
  }
}
