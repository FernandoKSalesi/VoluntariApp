import { prisma } from '../prisma/client';
import { EventRating } from '../../entities/EventRating';

export class EventRatingRepository {
  async save(rating: EventRating): Promise<EventRating> {
    if (rating.id) {
      const updated = await prisma.eventRating.update({
        where: { id: rating.id },
        data: {
          rating: rating.rating,
          comment: rating.comment ?? null,
        },
      });
      return new EventRating(updated, updated.id, updated.createdAt);
    }

    const created = await prisma.eventRating.create({
      data: {
        eventId: rating.eventId,
        userId: rating.userId,
        rating: rating.rating,
        comment: rating.comment ?? null,
      },
    });
    return new EventRating(created, created.id, created.createdAt);
  }

  async findByEventId(eventId: number): Promise<any[]> {
    return await prisma.eventRating.findMany({
      where: { eventId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserAndEvent(userId: number, eventId: number): Promise<EventRating | null> {
    const rating = await prisma.eventRating.findUnique({
      where: {
        eventId_userId: { eventId, userId }
      }
    });
    if (!rating) return null;
    return new EventRating(rating, rating.id, rating.createdAt);
  }
}
