import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
  console.log('Endpoints disponibles:');
  console.log('  GET    /api/v1/animals');
  console.log('  GET    /api/v1/animals/:id');
  console.log('  POST   /api/v1/animals');
  console.log('  PUT    /api/v1/animals/:id');
  console.log('  DELETE /api/v1/animals/:id');
});

process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});
