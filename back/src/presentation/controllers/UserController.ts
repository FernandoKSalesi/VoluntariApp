import type { Request, Response } from 'express';
import { UserService } from '../../services/UserService';
import type { CreateUserDTO } from '../dtos/CreateUserDTO';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body;
      const user = await this.userService.create(data);
      
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.userId;
      
      if (!id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const data = req.body;
      const user = await this.userService.update(id, data);
      
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const id = req.userId;

      if (!id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await this.userService.getUser(id);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getSubscriptions(req: Request, res: Response) {
    try {
      const id = req.userId;

      if (!id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { SubscriptionRepository } = await import('../../data/repositories/SubscriptionRepository');
      const repo = new SubscriptionRepository();
      const subs = await repo.findByUserId(id);

      return res.status(200).json(subs);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
