import app from './app.js';
import logger from './config/logger.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
  logger.info(`Endpoints disponibles:`);
  logger.info(`  GET    /api/v1/animals?page=1&limit=10`);
  logger.info(`  GET    /api/v1/animals/:id`);
  logger.info(`  POST   /api/v1/animals`);
  logger.info(`  PUT    /api/v1/animals/:id`);
  logger.info(`  DELETE /api/v1/animals/:id`);
});

process.on('SIGINT', () => {
  logger.warn('Recibida señal SIGINT. Cerrando servidor...');
  server.close(() => {
    logger.info('Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  logger.warn('Recibida señal SIGTERM. Cerrando servidor...');
  server.close(() => {
    logger.info('Servidor cerrado correctamente');
    process.exit(0);
  });
});