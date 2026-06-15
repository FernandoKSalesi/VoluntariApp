import { prisma } from '../prisma/client';

export class CategoryRepository {
  async findAll(): Promise<any[]> {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
