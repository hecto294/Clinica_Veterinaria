import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import logger from '../config/logger.js';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Log del error
  if (err instanceof AppError && err.isOperational) {
    logger.warn(`Operational error: ${err.message} - ${req.method} ${req.url}`);
  } else {
    logger.error(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'} - ${req.method} ${req.url}`);
  }

  // Detectar ZodError de forma robusta (incluso si instanceof falla)
  const isZodError = err instanceof ZodError ||
    (err && typeof err === 'object' && 'issues' in err && Array.isArray((err as any).issues));

  if (isZodError) {
    const zodErr = err as ZodError;
    const issues = zodErr.issues && Array.isArray(zodErr.issues)
      ? zodErr.issues.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      : [{ path: 'unknown', message: 'Validation error' }];

    res.status(400).json({
      error: 'Validation Error',
      issues
    });
    return;
  }

  // AppError - statusCode definido
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.name || 'Error',
      message: err.message
    });
    return;
  }

  // Error desconocido - 500
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'
  });
}