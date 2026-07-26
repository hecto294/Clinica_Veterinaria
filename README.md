# Clínica Veterinaria - Sistema de Gestión de Pacientes

Este es un proyecto que hice para la clase de bc-expressjs.
Es una herramienta de línea de comandos que lee datos de una clínica veterinaria
desde un archivo JSON y genera un reporte con la información.

---

## ¿Qué hace?

- Lee un archivo `animals.json` con información de los pacientes.
- Muestra un resumen en la terminal: total de pacientes, activos/inactivos,
  peso promedio, el más pesado y el más ligero.
- Permite filtrar los pacientes por especie usando `--category`.
- Guarda un reporte en formato JSON dentro de la carpeta `output/`.

---

## Tecnologías que usé

- Node.js
- TypeScript
- pnpm (como gestor de paquetes)
- fs/promises para leer y escribir archivos