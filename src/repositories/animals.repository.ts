import { Animal, CreateAnimalDto, UpdateAnimalDto } from '../types.js';

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
    lastVisit: new Date().toISOString(),
    createdAt: new Date().toISOString()
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
    lastVisit: new Date().toISOString(),
    createdAt: new Date().toISOString()
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
    lastVisit: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
];

let nextId = 4;

export class AnimalsRepository {
  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Animal[]; total: number }> {
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = animals.slice(start, end);
    return { data, total: animals.length };
  }

  async findById(id: number): Promise<Animal | null> {
    return animals.find(a => a.id === id) || null;
  }

  async create(data: CreateAnimalDto): Promise<Animal> {
    const newAnimal: Animal = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString()
    };
    animals.push(newAnimal);
    return { ...newAnimal };
  }

  async update(id: number, data: UpdateAnimalDto): Promise<Animal | null> {
    const index = animals.findIndex(a => a.id === id);
    if (index === -1) return null;

    animals[index] = { ...animals[index], ...data };
    return { ...animals[index] };
  }

  async delete(id: number): Promise<boolean> {
    const index = animals.findIndex(a => a.id === id);
    if (index === -1) return false;

    animals.splice(index, 1);
    return true;
  }
}