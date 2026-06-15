import { CategoryRepository } from '../data/repositories/CategoryRepository';

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async list() {
    return await this.categoryRepository.findAll();
  }
}
