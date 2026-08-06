import { Router } from 'express';
import { AnimalsController } from '../controllers/animals.controller.js';

const router = Router();

router.get('/', AnimalsController.getAll);
router.get('/:id', AnimalsController.getById);
router.post('/', AnimalsController.create);
router.put('/:id', AnimalsController.update);
router.delete('/:id', AnimalsController.delete);

export default router;