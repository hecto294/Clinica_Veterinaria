import { Animal, Summary } from '../types/animal.js';

export function generateSummary(animals: Animal[]): Summary {
  if (animals.length === 0) {
    return {
      totalAnimals: 0,
      activeAnimals: 0,
      inactiveAnimals: 0,
      averageWeight: 0,
      heaviestAnimal: null,
      lightestAnimal: null,
      speciesCount: {}
    };
  }

  const activeAnimals = animals.filter(a => a.active);
  const totalWeight = animals.reduce((sum, a) => sum + a.weight, 0);
  const averageWeight = totalWeight / animals.length;

  const heaviestAnimal = animals.reduce((max, a) => a.weight > max.weight ? a : max);
  const lightestAnimal = animals.reduce((min, a) => a.weight < min.weight ? a : min);

  const speciesCount = animals.reduce((acc, a) => {
    acc[a.species] = (acc[a.species] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalAnimals: animals.length,
    activeAnimals: activeAnimals.length,
    inactiveAnimals: animals.length - activeAnimals.length,
    averageWeight: Number(averageWeight.toFixed(2)),
    heaviestAnimal,
    lightestAnimal,
    speciesCount
  };
}

export function getUniqueCategories(animals: Animal[]): string[] {
  const categories = new Set(animals.map(a => a.species));
  return Array.from(categories);
}

export function filterBySpecies(animals: Animal[], species: string): Animal[] {
  return animals.filter(a => a.species.toLowerCase() === species.toLowerCase());
}