import { AnimalsRepository } from '../repositories/animals.repository.js';
import { CreateAnimalInput, UpdateAnimalInput } from '../schemas/animals.schema.js';
import { AppError } from '../errors/AppError.js';
import { CreateAnimalDto, UpdateAnimalDto } from '../types.js';

export class AnimalsService {
  private repository: AnimalsRepository;

  constructor() {
    this.repository = new AnimalsRepository();
  }

  async findAll(page: number = 1, limit: number = 10) {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit));
    return this.repository.findAll(validPage, validLimit);
  }

  async findById(id: number) {
    const animal = await this.repository.findById(id);
    if (!animal) {
      throw new AppError(404, `Animal con ID ${id} no encontrado`);
    }
    return animal;
  }

  async create(data: CreateAnimalInput): Promise<Animal> {
    return this.repository.create(data as CreateAnimalDto);
  }

  async update(id: number, data: UpdateAnimalInput): Promise<Animal> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError(404, `Animal con ID ${id} no encontrado`);
    }

    const updated = await this.repository.update(id, data as UpdateAnimalDto);
    if (!updated) {
      throw new AppError(404, `Animal con ID ${id} no encontrado`);
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError(404, `Animal con ID ${id} no encontrado`);
    }

    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError(404, `Animal con ID ${id} no encontrado`);
    }
  }
}