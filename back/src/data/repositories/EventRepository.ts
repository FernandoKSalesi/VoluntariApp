import { prisma } from '../prisma/client';
import { Event } from '../../entities/Event';

export class EventRepository {
  async save(event: Event): Promise<Event> {
    if (event.id) {
      const updated = await prisma.event.update({
        where: { id: event.id },
        data: {
          name: event.name,
          description: event.description ?? null,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location ?? null,
          imageUrl: event.imageUrl ?? null,
          totalSpots: event.totalSpots,
        },
      });
      return new Event(updated, updated.id, updated.createdAt);
    }

    const created = await prisma.event.create({
      data: {
        name: event.name,
        description: event.description ?? null,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location ?? null,
        imageUrl: event.imageUrl ?? null,
        totalSpots: event.totalSpots,
        organizer: {
          connect: { id: event.organizerId }
        }
      },
    });
    return new Event(created, created.id, created.createdAt);
  }

  async delete(id: number): Promise<void> {
    await prisma.event.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Event[]> {
    const events = await prisma.event.findMany({
      orderBy: { startTime: 'asc' },
    });
    return events.map((e) => new Event(e, e.id, e.createdAt));
  }

  async findById(id: number): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) return null;

    return new Event(event, event.id, event.createdAt);
  }

  async search(filters: {
    query?: string;
    location?: string;
    categories?: number[];
    startDate?: Date;
    endDate?: Date;
  }): Promise<Event[]> {
    const { query, location, categories, startDate, endDate } = filters;

    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ];
    }

    if (location) {
      where.location = { contains: location };
    }

    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) {
        where.startTime.gte = startDate;
      }
      if (endDate) {
        where.startTime.lte = endDate;
      }
    }

    if (categories && categories.length > 0) {
      where.categories = {
        some: {
          categoryId: { in: categories }
        }
      };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startTime: 'asc' },
    });
    return events.map((e) => new Event(e, e.id, e.createdAt));
  }
}
