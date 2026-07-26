export interface Animal {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  owner: string;
  ownerPhone: string;
  active: boolean;
  medicalHistory: string[];
  lastVisit: string;
  appointments: Appointment[];
  treatments: Treatment[];
}

export interface Appointment {
  date: string;
  reason: string;
  veterinarian: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Treatment {
  name: string;
  diagnosis: string;
  medication: string[];
  cost: number;
  startDate: string;
  endDate?: string;
}

export interface Summary {
  totalAnimals: number;
  activeAnimals: number;
  inactiveAnimals: number;
  averageWeight: number;
  heaviestAnimal: Animal | null;
  lightestAnimal: Animal | null;
  speciesCount: Record<string, number>;
}