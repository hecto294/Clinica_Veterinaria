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

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# semana 2


## 1. Resumen 

El presente proyecto consiste en el desarrollo de una API REST para la gestión de pacientes de una clínica veterinaria. La solución implementa operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre el recurso principal "Animal", utilizando el framework Express 5 con TypeScript. La API sigue los principios REST y maneja adecuadamente los códigos de estado HTTP, incluyendo middlewares para logging, manejo de errores y rutas no encontradas.

**Dominio:** Clínica Veterinaria  
**Recurso Principal:** Animal (Paciente)  
**Tecnología:** Node.js, Express 5, TypeScript, pnpm

---

## 2. Especificación del Recurso

### 2.1 Entidad Animal

La entidad principal del sistema es "Animal", que representa a los pacientes de la clínica veterinaria.

| Campo | Tipo | Descripción | Obligatorio |
|-------|------|-------------|-------------|
| id | number | Identificador único del paciente | Sí |
| name | string | Nombre del animal | Sí |
| species | string | Especie (perro, gato, conejo, etc.) | Sí |
| breed | string | Raza del animal | Sí |
| age | number | Edad en años | Sí |
| weight | number | Peso en kilogramos | Sí |
| ownerId | number | Identificador del dueño | Sí |
| active | boolean | Estado activo/inactivo | Sí |
| medicalHistory | string[] | Historial médico | No |
| lastVisit | string | Fecha de última visita (ISO 8601) | No |

### 2.2 Estructura de Datos

**Estructura de la interfaz Animal:**

- **id:** number - Identificador único del paciente
- **name:** string - Nombre del animal
- **species:** string - Especie (perro, gato, conejo, etc.)
- **breed:** string - Raza del animal
- **age:** number - Edad en años
- **weight:** number - Peso en kilogramos
- **ownerId:** number - Identificador del dueño
- **active:** boolean - Estado activo/inactivo
- **medicalHistory:** string[] - Historial médico
- **lastVisit:** string - Fecha de última visita (ISO 8601)

---

## 3. Arquitectura de la API

### 3.1 Endpoints Implementados

| Método | Endpoint | Descripción | Código de Éxito |
|--------|----------|-------------|-----------------|
| GET | /api/v1/animals | Obtiene todos los animales registrados | 200 OK |
| GET | /api/v1/animals/:id | Obtiene un animal por su ID | 200 OK |
| POST | /api/v1/animals | Registra un nuevo animal en el sistema | 201 Created |
| PUT | /api/v1/animals/:id | Actualiza la información de un animal | 200 OK |
| DELETE | /api/v1/animals/:id | Elimina un animal del sistema | 204 No Content |

### 3.2 Códigos de Error Implementados

| Código | Descripción | Escenario |
|--------|-------------|-----------|
| 400 Bad Request | Solicitud inválida | ID no numérico o campos requeridos faltantes |
| 404 Not Found | Recurso no encontrado | Animal no existe o ruta incorrecta |
| 405 Method Not Allowed | Método no permitido | Uso de método HTTP no soportado |
| 500 Internal Server Error | Error interno | Fallo inesperado en el servidor |

### 3.3 Middlewares Implementados

Se implementaron los siguientes middlewares para mejorar la calidad y robustez de la API:

- **Logger Personalizado:** Registra cada petición con método, URL, código de estado y tiempo de respuesta en milisegundos.
- **Handler 404:** Gestiona las rutas no encontradas, devolviendo un mensaje descriptivo.
- **Error Handler Global:** Captura y procesa errores internos, asegurando respuestas consistentes.

---

## 4. Evidencias de Pruebas

### 4.1 Pruebas Realizadas

| # | Prueba | Endpoint | Método | Código Esperado |
|---|--------|----------|--------|-----------------|
| 1 | Listar animales | /api/v1/animals | GET | 200 OK |
| 2 | Obtener animal por ID | /api/v1/animals/1 | GET | 200 OK |
| 3 | Crear nuevo animal | /api/v1/animals | POST | 201 Created |
| 4 | Actualizar animal | /api/v1/animals/1 | PUT | 200 OK |
| 5 | Eliminar animal | /api/v1/animals/3 | DELETE | 204 No Content |
| 6 | ID inválido | /api/v1/animals/abc | GET | 400 Bad Request |
| 7 | Animal no encontrado | /api/v1/animals/99 | GET | 404 Not Found |
| 8 | Ruta inexistente | /api/v1/animales | GET | 404 Not Found |

### 4.2 Evidencia de Ejecución

Las pruebas se realizaron utilizando:

- **Cliente HTTP integrado de IntelliJ IDEA** para pruebas locales
- **Curl** para validación desde terminal
- **Navegador web** para verificación de endpoints GET
# Semana 03 - API REST con Arquitectura en Capas

refactorizamos la API de la Semana 02 aplicando una **arquitectura profesional en 4 capas** (Routes → Controllers → Services → Repositories). Esto separa las responsabilidades del código, mejora la mantenibilidad y prepara el proyecto para escalar.

## Arquitectura en 4 Capas

| Capa | Responsabilidad |
|------|-----------------|
| **Routes** | Define los endpoints de la API |
| **Controllers** | Maneja peticiones y respuestas HTTP |
| **Services** | Contiene la lógica de negocio y validaciones |
| **Repositories** | Accede a los datos (store en memoria) |


# Semana 04 - Validación, Errores y Logging

---

## Resumen : 



* En la Semana 04, mejoramos la API de la Semana 03 agregando:

- Validación profesional de datos
- Manejo estructurado de errores
- Logging para monitorear lo que pasa en el servidor

---

### 1. Validación con Zod

**Antes (Semana 03):** Validábamos manualmente con `if (!data.name)`.

**Ahora (Semana 04):** Definimos un esquema Zod que valida automáticamente.

Si falta un campo obligatorio → Zod devuelve **400** con lista de errores.

---

### 2. Manejo de Errores con AppError

**Antes (Semana 03):** Usábamos `throw new Error('...')` y el error handler genérico devolvía 500.

**Ahora (Semana 04):** Creamos `AppError` que permite definir el código de estado.

**Resultado:** Errores operacionales (404, 400) tienen su propio código HTTP.

---

### 3. Logging con Winston + Morgan

**Antes (Semana 03):** Usábamos `console.log()` para todo.

**Ahora (Semana 04):** Usamos:

- **Winston** → logs estructurados
- **Morgan** → logs HTTP

---------

# Semana 05 — PostgreSQL + Prisma ORM

---

## Resumen

En la Semana 05, migramos la API de la Clínica Veterinaria de un almacenamiento en memoria a una base de datos **PostgreSQL** utilizando **Prisma ORM**, logrando persistencia real de los datos.

---

## ¿Qué hicimos?

### 1. Configuramos PostgreSQL con Docker

Levantamos un contenedor de PostgreSQL en nuestra máquina usando Docker Compose.

### 2. Instalamos y configuramos Prisma

Instalamos Prisma ORM, generamos el cliente y conectamos la API con la base de datos.

### 3. Definimos los modelos de datos

Creamos dos modelos relacionados:

- **Species** (Especies): perro, gato, conejo
- **Animal** (Pacientes): con una relación 1:N hacia Species

### 4. Ejecutamos migraciones

Creamos las tablas en PostgreSQL a partir de los modelos definidos en Prisma.

### 5. Cargamos datos de prueba (Seed)

Insertamos 3 especies y 12 animales de ejemplo en la base de datos.

### 6. Adaptamos la API para usar Prisma

Actualizamos los repositorios para que usen Prisma Client en lugar del store en memoria.

---



