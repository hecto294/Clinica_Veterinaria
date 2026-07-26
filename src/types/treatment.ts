export interface Treatment {
  id: number;
  animalId: number;       // Relación con Animal
  name: string;
  diagnosis: string;
  medication: string[];
  cost: number;
  startDate: string;      // fecha ISO
  endDate?: string;       // fecha ISO (opcional)
}