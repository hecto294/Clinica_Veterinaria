import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL no está definida en .env');
  process.exit(1);
}

console.log('📡 Conectando a la base de datos...');

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Crear especies
  await prisma.species.createMany({
    data: [
      { name: 'perro', description: 'Canino doméstico' },
      { name: 'gato', description: 'Felino doméstico' },
      { name: 'conejo', description: 'Lagomorfo doméstico' }
    ]
  });

  console.log('✅ Especies creadas');

  // Obtener las especies
  const [perro, gato, conejo] = await prisma.species.findMany();

  // Crear animales
  await prisma.animal.createMany({
    data: [
      { name: 'Max', speciesId: perro.id, breed: 'Golden Retriever', age: 3, weight: 32.5, ownerId: 1, active: true, medicalHistory: ['Vacunación anual'] },
      { name: 'Luna', speciesId: gato.id, breed: 'Siamés', age: 5, weight: 4.2, ownerId: 2, active: true, medicalHistory: ['Esterilización'] },
      { name: 'Rocky', speciesId: perro.id, breed: 'Bulldog Francés', age: 2, weight: 12.8, ownerId: 3, active: false, medicalHistory: ['Alergias'] },
      { name: 'Milo', speciesId: gato.id, breed: 'Persa', age: 7, weight: 5.1, ownerId: 4, active: true, medicalHistory: ['Enfermedad renal crónica'] },
      { name: 'Nala', speciesId: perro.id, breed: 'Labrador', age: 4, weight: 28.0, ownerId: 5, active: true, medicalHistory: ['Displasia de cadera'] },
      { name: 'Simba', speciesId: gato.id, breed: 'Maine Coon', age: 3, weight: 7.8, ownerId: 6, active: true, medicalHistory: ['Cardiomiopatía'] },
      { name: 'Bruno', speciesId: perro.id, breed: 'Pastor Alemán', age: 6, weight: 38.2, ownerId: 7, active: false, medicalHistory: ['Torsión gástrica'] },
      { name: 'Coco', speciesId: conejo.id, breed: 'Belier', age: 2, weight: 2.3, ownerId: 8, active: true, medicalHistory: ['Problemas dentales'] },
      { name: 'Toby', speciesId: perro.id, breed: 'Yorkshire', age: 1, weight: 2.8, ownerId: 9, active: true, medicalHistory: ['Vacunación inicial'] },
      { name: 'Gizmo', speciesId: gato.id, breed: 'Bengala', age: 4, weight: 6.5, ownerId: 10, active: true, medicalHistory: ['Infección urinaria'] },
      { name: 'Lola', speciesId: perro.id, breed: 'Poodle', age: 8, weight: 7.5, ownerId: 11, active: true, medicalHistory: ['Artritis'] },
      { name: 'Pelusa', speciesId: conejo.id, breed: 'Enano', age: 1, weight: 1.5, ownerId: 12, active: true, medicalHistory: ['Revisión inicial'] }
    ]
  });

  console.log('✅ Animales creados');
  console.log('✅ Seed completado exitosamente');
}

main()
  .catch((error) => {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());