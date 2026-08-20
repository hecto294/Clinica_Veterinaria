import { Request, Response, NextFunction } from 'express';
import { AnimalsService } from '../services/animals.service.js';

const animalsService = new AnimalsService();

export class AnimalsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await animalsService.findAll(page, limit);

      res.status(200).json({
        data: result.data,
        total: result.total,
        page,
        limit
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          error: 'Validation Error',
          issues: [{ path: 'id', message: 'El ID debe ser un número entero positivo' }]
        });
        return;
      }

      const animal = await animalsService.findById(id);
      if (!animal) {
        res.status(404).json({ error: 'Not Found', message: `Animal con ID ${id} no encontrado` });
        return;
      }

      res.status(200).json({ data: animal });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const animal = await animalsService.create(req.body);
      res.status(201).json({ data: animal });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          error: 'Validation Error',
          issues: [{ path: 'id', message: 'El ID debe ser un número entero positivo' }]
        });
        return;
      }

      const updated = await animalsService.update(id, req.body);
      if (!updated) {
        res.status(404).json({ error: 'Not Found', message: `Animal con ID ${id} no encontrado` });
        return;
      }

      res.status(200).json({ data: updated });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          error: 'Validation Error',
          issues: [{ path: 'id', message: 'El ID debe ser un número entero positivo' }]
        });
        return;
      }

      const deleted = await animalsService.delete(id);
      if (!deleted) {
        res.status(404).json({ error: 'Not Found', message: `Animal con ID ${id} no encontrado` });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}