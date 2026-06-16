import { prisma } from '../prisma/client';
import { Notification } from '../../entities/Notification';

export class NotificationRepository {
  async save(notification: Notification): Promise<Notification> {
    if (notification.id) {
      const updated = await prisma.notification.update({
        where: { id: notification.id },
        data: {
          read: notification.read,
        },
      });
      return new Notification(updated, updated.id, updated.sentAt);
    }

    const created = await prisma.notification.create({
      data: {
        eventId: notification.eventId ?? null,
        userId: notification.userId,
        senderId: notification.senderId ?? null,
        title: notification.title,
        message: notification.message,
        read: notification.read,
      },
    });
    return new Notification(created, created.id, created.sentAt);
  }

  async createMany(notifications: Notification[]): Promise<void> {
    const data = notifications.map(n => ({
      eventId: n.eventId ?? null,
      userId: n.userId,
      senderId: n.senderId ?? null,
      title: n.title,
      message: n.message,
      read: n.read,
    }));
    await prisma.notification.createMany({ data });
  }

  async findByUserId(userId: number): Promise<any[]> {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
      include: {
        sender: { select: { name: true } },
        event: { select: { name: true } }
      }
    });
  }

  async markAsRead(id: number): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { read: true }
    });
  }

  async markAllAsRead(userId: number): Promise<void> {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }
}
