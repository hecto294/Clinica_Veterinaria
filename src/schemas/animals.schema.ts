import { z } from 'zod';

// Esquema para crear un animal
export const createAnimalSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }).trim(),
  species: z.string().min(1, { message: 'La especie es requerida' }).trim(),
  breed: z.string().min(1, { message: 'La raza es requerida' }).trim(),
  age: z.number().int().nonnegative({ message: 'La edad debe ser un número positivo' }).default(0),
  weight: z.number().positive({ message: 'El peso debe ser mayor a 0' }).default(0),
  ownerId: z.number().int().positive({ message: 'El ID del dueño debe ser un número positivo' }),
  active: z.boolean().default(true),
  medicalHistory: z.array(z.string()).default([]),
  lastVisit: z.string().datetime({ message: 'Fecha inválida' }).optional()
});

// Esquema para actualizar (todos los campos opcionales)
export const updateAnimalSchema = createAnimalSchema.partial();

// Tipos inferidos de Zod
export type CreateAnimalInput = z.infer<typeof createAnimalSchema>;
export type UpdateAnimalInput = z.infer<typeof updateAnimalSchema>;

// Esquema para validar ID en parámetros
export const idSchema = z.coerce.number().int().positive({
  message: 'El ID debe ser un número entero positivo'
});