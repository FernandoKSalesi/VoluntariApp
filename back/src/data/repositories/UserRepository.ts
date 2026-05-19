import { prisma } from '../prisma/client';
import { User } from '../../entities/User';

export class UserRepository {
  async save(user: User): Promise<User> {
    if (user.id) {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone ?? null,
          cpf: user.cpf ?? null,
          username: user.username,
          passwordHash: user.passwordHash,
        },
      });
      return new User(updated, updated.id);
    }

    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone ?? null,
        cpf: user.cpf ?? null,
        username: user.username,
        passwordHash: user.passwordHash,
      },
    });
    return new User(created, created.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(user, user.id);
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new User(user, user.id);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    return new User(user, user.id);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) return null;

    return new User(user, user.id);
  }
}
