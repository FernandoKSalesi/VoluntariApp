import { prisma } from '../prisma/client';
import { SubscriptionStatus } from '@prisma/client';

export class SubscriptionRepository {
  async create(userId: number, eventId: number) {
    return await prisma.subscription.create({
      data: {
        userId,
        eventId,
        status: SubscriptionStatus.CONFIRMED,
      },
    });
  }

  async findByUserAndEvent(userId: number, eventId: number) {
    return await prisma.subscription.findFirst({
      where: {
        userId,
        eventId,
      },
    });
  }

  async delete(userId: number, eventId: number) {
    const subscription = await this.findByUserAndEvent(userId, eventId);
    if (!subscription) return;

    await prisma.subscription.delete({
      where: {
        id: subscription.id,
      },
    });
  }

  async findByUserId(userId: number) {
    return await prisma.subscription.findMany({
      where: { userId },
      include: {
        event: true,
      },
    });
  }

  async findByEventId(eventId: number) {
    return await prisma.subscription.findMany({
      where: { eventId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });
  }
}
