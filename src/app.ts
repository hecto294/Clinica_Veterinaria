import express, { Express, Request, Response, NextFunction } from 'express';
import animalsRouter from './routes/animals.routes.js';

const app: Express = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  const originalEnd = res.end;
  res.end = function(...args: any[]) {
    const duration = Date.now() - start;
    console.log('[' + new Date().toISOString() + '] ' + req.method + ' ' + req.url + ' - ' + res.statusCode + ' - ' + duration + 'ms');
    originalEnd.apply(res, args);
  };
  
  next();
});

app.use('/api/v1/animals', animalsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Ruta ' + req.method + ' ' + req.url + ' no encontrada'
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

export default app;
