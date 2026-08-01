import { Router, Request, Response, NextFunction } from 'express';
import { getAll, getById, create, update, remove } from '../store.js';
import { CreateAnimalDto } from '../types.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const animals = getAll();
  res.status(200).json(animals);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID invalido' });
      return;
    }

    const animal = getById(id);
    if (!animal) {
      res.status(404).json({ error: 'Animal con ID ' + id + ' no encontrado' });
      return;
    }

    res.status(200).json(animal);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as CreateAnimalDto;
    
    if (!data.name || !data.species) {
      res.status(400).json({ error: 'Faltan campos requeridos: name, species' });
      return;
    }

    const newAnimal = create(data);
    res.status(201).json(newAnimal);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID invalido' });
      return;
    }

    const updated = update(id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Animal con ID ' + id + ' no encontrado' });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID invalido' });
      return;
    }

    const deleted = remove(id);
    if (!deleted) {
      res.status(404).json({ error: 'Animal con ID ' + id + ' no encontrado' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
