import { Request, Response } from 'express';
import logger from '../config/logger.js';

export function notFoundHandler(req: Request, res: Response) {
  logger.warn(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: 'Not Found',
    message: `Ruta ${req.method} ${req.url} no encontrada`
  });
}