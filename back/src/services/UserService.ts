import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../data/repositories/UserRepository';
import { User } from '../entities/User';
import type { CreateUserDTO } from '../presentation/dtos/CreateUserDTO';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: CreateUserDTO) {
    const { name, email, phone, cpf, username, password } = data;

    // Check if user already exists
    const [emailExists, userNameExists, cpfExists] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
      cpf ? this.userRepository.findByCpf(cpf) : Promise.resolve(null)
    ]);

    if (emailExists) throw new Error('Email already registered');
    if (userNameExists) throw new Error('Username already registered');
    if (cpfExists) throw new Error('CPF already registered');

    const passwordHash = await bcrypt.hash(password || '', 10);

    const user = new User({
      name,
      email,
      phone: phone || null,
      cpf: cpf || null,
      username,
      passwordHash,
    });

    const newUser = await this.userRepository.save(user);

    // Remove passwordHash from return object
    const { passwordHash: _, ...returnUser } = newUser;
    return returnUser;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    };
  }

  async update(id: number, data: Partial<CreateUserDTO>) {
    const { name, email, phone, cpf, username, password } = data;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email) {
      const existingEmail = await this.userRepository.findByEmail(email);
      if (existingEmail && existingEmail.id !== id) throw new Error('Email already registered');
      user.email = email;
    }
    if (phone) user.phone = phone;
    if (cpf) {
      const existingCpf = await this.userRepository.findByCpf(cpf);
      if (existingCpf && existingCpf.id !== id) throw new Error('CPF already registered');
      user.cpf = cpf;
    }
    if (username) {
      const existingUsername = await this.userRepository.findByUsername(username);
      if (existingUsername && existingUsername.id !== id) throw new Error('Username already registered');
      user.username = username;
    }

    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await this.userRepository.save(user);

    const { passwordHash: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
