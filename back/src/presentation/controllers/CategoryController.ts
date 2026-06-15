import type { Request, Response } from 'express';
import { CategoryService } from '../../services/CategoryService';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async list(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.list();
      return res.json(categories);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
