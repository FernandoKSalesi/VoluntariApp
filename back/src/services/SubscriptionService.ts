import { SubscriptionRepository } from '../data/repositories/SubscriptionRepository';
import { EventRepository } from '../data/repositories/EventRepository';
import { NotificationRepository } from '../data/repositories/NotificationRepository';
import { Notification } from '../entities/Notification';

export class SubscriptionService {
  private subscriptionRepository: SubscriptionRepository;
  private eventRepository: EventRepository;
  private notificationRepository: NotificationRepository;

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository();
    this.eventRepository = new EventRepository();
    this.notificationRepository = new NotificationRepository();
  }

  async subscribe(userId: number, eventId: number) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (new Date(event.startTime) < new Date()) {
      throw new Error('Não é possível se inscrever em um evento que já passou.');
    }

    const existingSubscription = await this.subscriptionRepository.findByUserAndEvent(userId, eventId);
    if (existingSubscription) {
      throw new Error('Already subscribed to this event');
    }

    const eventData = event as any;
    if (eventData._count.subscriptions >= eventData.totalSpots) {
      throw new Error('Event is full');
    }

    const subscription = await this.subscriptionRepository.create(userId, eventId);

    const notification = new Notification({
      eventId,
      userId,
      senderId: null,
      title: 'Inscrição confirmada',
      message: `Você se inscreveu com sucesso no evento "${event.name}".`,
      read: false
    });
    await this.notificationRepository.save(notification);

    return subscription;
  }

  async unsubscribe(userId: number, eventId: number) {
    await this.subscriptionRepository.delete(userId, eventId);
  }

  async isSubscribed(userId: number, eventId: number) {
    const subscription = await this.subscriptionRepository.findByUserAndEvent(userId, eventId);
    return !!subscription;
  }

  async getEventParticipants(eventId: number, organizerId: number) {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== organizerId) {
      throw new Error('You do not have permission to view participants for this event');
    }

    return await this.subscriptionRepository.findByEventId(eventId);
  }
}
