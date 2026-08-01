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
}

export type CreateAnimalDto = Omit<Animal, 'id'>;

export interface UpdateAnimalDto extends Partial<Omit<Animal, 'id'>> {}
