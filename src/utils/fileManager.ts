import fs from 'fs/promises';
import path from 'path';
import { Animal } from '../types/animal.js';
import { Owner } from '../types/owner.js';
import { Appointment } from '../types/appointment.js';
import { Treatment } from '../types/treatment.js';

const DATA_PATH = path.join(process.cwd(), 'data', 'animals.json');

export interface VetData {
  animals: Animal[];
  owners: Owner[];
  appointments: Appointment[];
  treatments: Treatment[];
}

export async function readVetData(): Promise<VetData> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data) as VetData;
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error('Error: El archivo animals.json no existe en la carpeta data/');
      console.error('Asegurate de que el archivo existe y contiene datos validos.');
      process.exit(1);
    }
    throw error;
  }
}

export async function writeReport(data: any, filename: string = 'report.json'): Promise<void> {
  const outputDir = path.join(process.cwd(), 'output');
  const outputPath = path.join(outputDir, filename);

  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error al crear el directorio output:', error);
    process.exit(1);
  }

  try {
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Reporte guardado en: ' + outputPath);
  } catch (error) {
    console.error('Error al escribir el archivo de reporte:', error);
    process.exit(1);
  }
}