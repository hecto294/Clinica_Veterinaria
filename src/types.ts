export interface Animal {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  ownerId: number;
  active: boolean;
  medicalHistory: string[];
  lastVisit: string;
  createdAt: string;
}

export type CreateAnimalDto = Omit<Animal, 'id' | 'createdAt'>;
export type UpdateAnimalDto = Partial<Omit<Animal, 'id' | 'createdAt'>>;