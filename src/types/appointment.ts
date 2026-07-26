export interface Appointment {
  id: number;
  animalId: number;       // Relación con Animal
  date: string;           // fecha y hora ISO
  reason: string;
  veterinarian: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}