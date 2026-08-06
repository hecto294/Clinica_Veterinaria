import { AnimalsRepository } from '../repositories/animals.repository.js';
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
    if (isNaN(id) || id <= 0) {
      throw new Error('ID inválido');
    }
    return this.repository.findById(id);
  }

  async create(data: CreateAnimalDto) {
    if (!data.name || !data.species) {
      throw new Error('Faltan campos requeridos: name, species');
    }
    if (data.age !== undefined && data.age < 0) {
      throw new Error('La edad no puede ser negativa');
    }
    if (data.weight !== undefined && data.weight < 0) {
      throw new Error('El peso no puede ser negativo');
    }
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateAnimalDto) {
    if (isNaN(id) || id <= 0) {
      throw new Error('ID inválido');
    }
    if (data.age !== undefined && data.age < 0) {
      throw new Error('La edad no puede ser negativa');
    }
    if (data.weight !== undefined && data.weight < 0) {
      throw new Error('El peso no puede ser negativo');
    }
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new Error('ID inválido');
    }
    return this.repository.delete(id);
  }
}