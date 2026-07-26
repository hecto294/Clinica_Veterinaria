#!/usr/bin/env node

import { readVetData, writeReport } from './utils/fileManager.js';
import { generateSummary, getUniqueCategories, filterBySpecies } from './utils/reportGenerator.js';
import { Animal } from './types/animal.js';

function displaySummary(animals: Animal[], filtered: boolean = false): void {
  const summary = generateSummary(animals);

  console.log('\nRESUMEN DE PACIENTES');
  console.log('='.repeat(50));
  console.log('Total de pacientes: ' + summary.totalAnimals);
  console.log('Activos: ' + summary.activeAnimals);
  console.log('Inactivos: ' + summary.inactiveAnimals);
  console.log('Peso promedio: ' + summary.averageWeight + ' kg');

  if (summary.heaviestAnimal) {
    console.log('Paciente mas pesado: ' + summary.heaviestAnimal.name + ' (' + summary.heaviestAnimal.weight + ' kg)');
  }
  if (summary.lightestAnimal) {
    console.log('Paciente mas ligero: ' + summary.lightestAnimal.name + ' (' + summary.lightestAnimal.weight + ' kg)');
  }

  console.log('\nDistribucion por especie:');
  for (const [species, count] of Object.entries(summary.speciesCount)) {
    console.log('  - ' + species + ': ' + count);
  }

  if (filtered) {
    console.log('\nMostrando pacientes filtrados por especie');
  }
}

async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    let categoryFilter: string | null = null;

    const categoryIndex = args.indexOf('--category');
    if (categoryIndex !== -1 && args[categoryIndex + 1]) {
      categoryFilter = args[categoryIndex + 1];
    }

    console.log('Leyendo datos de pacientes...');
    const data = await readVetData();
    const animals = data.animals;

    const availableSpecies = getUniqueCategories(animals);

    let filteredAnimals = animals;
    let isFiltered = false;

    if (categoryFilter) {
      filteredAnimals = filterBySpecies(animals, categoryFilter);
      isFiltered = true;

      if (filteredAnimals.length === 0) {
        console.warn('\nAdvertencia: No se encontraron pacientes de la especie "' + categoryFilter + '"');
        console.warn('Especies disponibles: ' + availableSpecies.join(', '));
        console.log('\nMostrando todos los pacientes...');
        filteredAnimals = animals;
        isFiltered = false;
      } else {
        console.log('\nFiltrando por especie: ' + categoryFilter);
        console.log('Encontrados ' + filteredAnimals.length + ' pacientes de esta especie');
      }
    }

    displaySummary(filteredAnimals, isFiltered);

    const report = {
      timestamp: new Date().toISOString(),
      filter: categoryFilter || 'none',
      summary: generateSummary(filteredAnimals),
      animals: filteredAnimals
    };

    const reportFilename = categoryFilter
      ? 'report_' + categoryFilter.toLowerCase() + '.json'
      : 'report.json';

    await writeReport(report, reportFilename);

    console.log('\nProceso completado exitosamente');

  } catch (error) {
    console.error('Error inesperado:', error);
    process.exit(1);
  }
}

main();