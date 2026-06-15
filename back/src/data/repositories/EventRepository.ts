import { prisma } from '../prisma/client';
import { Event } from '../../entities/Event';

export class EventRepository {
  async save(event: Event, categoryNames?: string[]): Promise<Event> {
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
          ...(categoryNames ? {
            categories: {
              deleteMany: {},
              create: categoryNames.map(name => ({
                category: { connectOrCreate: { where: { name }, create: { name } } }
              }))
            }
          } : {})
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
        },
        ...(categoryNames ? {
          categories: {
            create: categoryNames.map(name => ({
              category: { connectOrCreate: { where: { name }, create: { name } } }
            }))
          }
        } : {})
      },
    });
    return new Event(created, created.id, created.createdAt);
  }

  async findByOrganizer(organizerId: number): Promise<any[]> {
    const events = await prisma.event.findMany({
      where: { organizerId },
      include: {
        organizer: {
          select: { name: true }
        },
        categories: {
          include: { category: true }
        },
        _count: {
          select: { subscriptions: true }
        }
      },
      orderBy: { startTime: 'desc' },
    });
    return events;
  }

  async delete(id: number): Promise<void> {
    await prisma.eventCategory.deleteMany({ where: { eventId: id } });
    await prisma.subscription.deleteMany({ where: { eventId: id } });
    await prisma.notification.deleteMany({ where: { eventId: id } });
    await prisma.eventRating.deleteMany({ where: { eventId: id } });
    await prisma.event.delete({
      where: { id },
    });
  }

  async findAll(): Promise<any[]> {
    const events = await prisma.event.findMany({
      include: {
        organizer: {
          select: { name: true }
        },
        categories: {
          include: { category: true }
        },
        _count: {
          select: { subscriptions: true }
        }
      },
      orderBy: { startTime: 'asc' },
    });
    return events;
  }

  async findById(id: number): Promise<any | null> {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { name: true }
        },
        categories: {
          include: { category: true }
        },
        _count: {
          select: { subscriptions: true }
        }
      },
    });

    if (!event) return null;

    return event;
  }

  async search(filters: {
    query?: string;
    location?: string;
    categories?: number[];
    startDate?: Date;
    endDate?: Date;
  }): Promise<any[]> {
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
      include: {
        organizer: {
          select: { name: true }
        },
        categories: {
          include: { category: true }
        },
        _count: {
          select: { subscriptions: true }
        }
      },
      orderBy: { startTime: 'asc' },
    });
    return events;
  }
}
