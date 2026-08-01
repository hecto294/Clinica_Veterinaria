import { Animal, CreateAnimalDto } from './types.js';

// Datos iniciales (3 animales de ejemplo)
let animals: Animal[] = [
  {
    id: 1,
    name: "Max",
    species: "perro",
    breed: "Golden Retriever",
    age: 3,
    weight: 32.5,
    ownerId: 1,
    active: true,
    medicalHistory: ["Vacunación anual"],
    lastVisit: new Date().toISOString()
  },
  {
    id: 2,
    name: "Luna",
    species: "gato",
    breed: "Siamés",
    age: 5,
    weight: 4.2,
    ownerId: 2,
    active: true,
    medicalHistory: ["Esterilización"],
    lastVisit: new Date().toISOString()
  },
  {
    id: 3,
    name: "Rocky",
    species: "perro",
    breed: "Bulldog Francés",
    age: 2,
    weight: 12.8,
    ownerId: 3,
    active: false,
    medicalHistory: ["Alergias"],
    lastVisit: new Date().toISOString()
  }
];

let nextId = 4;

export function getAll(): Animal[] {
  return animals;
}

export function getById(id: number): Animal | undefined {
  return animals.find(a => a.id === id);
}

export function create(data: CreateAnimalDto): Animal {
  const newAnimal: Animal = {
    id: nextId++,
    ...data
  };
  animals.push(newAnimal);
  return newAnimal;
}

export function update(id: number, data: Partial<Omit<Animal, 'id'>>): Animal | undefined {
  const index = animals.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  
  animals[index] = { ...animals[index], ...data };
  return animals[index];
}

export function remove(id: number): boolean {
  const index = animals.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  animals.splice(index, 1);
  return true;
}
