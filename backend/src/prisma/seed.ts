import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Athens location
  const athens = await prisma.location.upsert({
    where: { slug: 'athens' },
    update: {},
    create: {
      name: 'Athens',
      slug: 'athens',
      description: 'The capital and largest city of Greece, Athens has a rich history spanning over 3,400 years.',
    },
  })

  console.log('✅ Created location: Athens')

  // Create Ancient Greece time period
  const ancientGreece = await prisma.timePeriod.upsert({
    where: { id: 'ancient-athens' },
    update: {},
    create: {
      id: 'ancient-athens',
      locationId: athens.id,
      name: 'Ancient Greece (Classical Period)',
      eraSlug: 'ancient',
      yearStart: -500,
      yearEnd: -300,
      description: 'The golden age of Athens, featuring the Parthenon, Agora, and great philosophers.',
      environmentData: {
        skyColor: '#87CEEB',
        groundColor: '#D2B48C',
        ambientLight: '#FFFFFF',
        directionalLight: '#FFF8DC',
      },
    },
  })

  console.log('✅ Created time period: Ancient Greece')

  // Create Medieval Athens time period
  const medievalAthens = await prisma.timePeriod.upsert({
    where: { id: 'medieval-athens' },
    update: {},
    create: {
      id: 'medieval-athens',
      locationId: athens.id,
      name: 'Medieval Athens (Byzantine/Ottoman)',
      eraSlug: 'medieval',
      yearStart: 1200,
      yearEnd: 1800,
      description: 'Athens under Byzantine and Ottoman rule, featuring churches, minarets, and fortified structures.',
      environmentData: {
        skyColor: '#B0C4DE',
        groundColor: '#CD853F',
        ambientLight: '#FFF5EE',
        directionalLight: '#FFE4B5',
      },
    },
  })

  console.log('✅ Created time period: Medieval Athens')

  // Create Modern Athens time period
  const modernAthens = await prisma.timePeriod.upsert({
    where: { id: 'modern-athens' },
    update: {},
    create: {
      id: 'modern-athens',
      locationId: athens.id,
      name: 'Modern Athens (Contemporary)',
      eraSlug: 'modern',
      yearStart: 1900,
      yearEnd: 2024,
      description: 'Contemporary Athens with restoration of ancient sites, modern buildings, and vibrant tourism.',
      environmentData: {
        skyColor: '#87CEEB',
        groundColor: '#808080',
        ambientLight: '#FFFFFF',
        directionalLight: '#FFFACD',
      },
    },
  })

  console.log('✅ Created time period: Modern Athens')

  // Ancient Greece Characters
  const ancientCharacters = [
    {
      name: 'Socrates',
      wikipediaPageTitle: 'Socrates',
      birthYear: -470,
      deathYear: -399,
      role: 'Philosopher',
      positionX: 5,
      positionY: 0,
      positionZ: 3,
      modelType: 'male_toga',
      fallbackDescription: 'A classical Greek philosopher credited as the founder of Western philosophy.',
      greetingMessage: 'Greetings, traveler. I was just contemplating the nature of knowledge. What brings you to the Agora today?',
    },
    {
      name: 'Pericles',
      wikipediaPageTitle: 'Pericles',
      birthYear: -495,
      deathYear: -429,
      role: 'Statesman',
      positionX: -5,
      positionY: 0,
      positionZ: 5,
      modelType: 'male_toga',
      fallbackDescription: 'A prominent Greek statesman, orator, and general during the Golden Age of Athens.',
      greetingMessage: 'Welcome! I am overseeing the construction of the Parthenon. Athens is becoming the greatest city in Greece.',
    },
    {
      name: 'Aspasia',
      wikipediaPageTitle: 'Aspasia',
      birthYear: -470,
      deathYear: -400,
      role: 'Intellectual and Companion of Pericles',
      positionX: 8,
      positionY: 0,
      positionZ: -4,
      modelType: 'female_dress',
      fallbackDescription: 'An influential woman in ancient Athens, known for her intelligence and relationship with Pericles.',
      greetingMessage: 'Greetings. It is rare to meet someone interested in philosophy and rhetoric. What would you like to discuss?',
    },
    {
      name: 'Plato',
      wikipediaPageTitle: 'Plato',
      birthYear: -428,
      deathYear: -348,
      role: 'Philosopher',
      positionX: -7,
      positionY: 0,
      positionZ: -3,
      modelType: 'male_toga',
      fallbackDescription: 'A student of Socrates and founder of the Academy, one of the first institutions of higher learning.',
      greetingMessage: 'Welcome to my Academy. Here we study philosophy, mathematics, and the nature of reality itself.',
    },
  ]

  for (const char of ancientCharacters) {
    await prisma.character.create({
      data: {
        ...char,
        timePeriodId: ancientGreece.id,
      },
    })
    console.log(`  ✅ Created character: ${char.name}`)
  }

  // Medieval Athens Characters
  const medievalCharacters = [
    {
      name: 'Michael Choniates',
      wikipediaPageTitle: 'Michael_Choniates',
      birthYear: 1138,
      deathYear: 1222,
      role: 'Byzantine Scholar and Archbishop',
      positionX: 4,
      positionY: 0,
      positionZ: 6,
      modelType: 'male_robe',
      fallbackDescription: 'A Byzantine scholar and Archbishop of Athens during the late 12th century.',
      greetingMessage: 'Blessings upon you. I serve as Archbishop of this ancient city, preserving its Christian heritage.',
    },
    {
      name: 'Omar Pasha',
      wikipediaPageTitle: 'Ottoman_Greece',
      birthYear: 1760,
      deathYear: 1820,
      role: 'Ottoman Governor',
      positionX: -6,
      positionY: 0,
      positionZ: 4,
      modelType: 'male_ottoman',
      fallbackDescription: 'An Ottoman administrator overseeing Athens during Ottoman rule.',
      greetingMessage: 'Merhaba. I govern Athens on behalf of the Sultan. The city is peaceful under Ottoman protection.',
    },
    {
      name: 'Helena Kantakouzene',
      wikipediaPageTitle: 'Byzantine_Empire',
      birthYear: 1240,
      deathYear: 1303,
      role: 'Byzantine Noblewoman',
      positionX: 7,
      positionY: 0,
      positionZ: -5,
      modelType: 'female_byzantine',
      fallbackDescription: 'A noblewoman from a prominent Byzantine family in Athens.',
      greetingMessage: 'Greetings, stranger. Life in Athens has changed much since the days of the ancient philosophers.',
    },
  ]

  for (const char of medievalCharacters) {
    await prisma.character.create({
      data: {
        ...char,
        timePeriodId: medievalAthens.id,
      },
    })
    console.log(`  ✅ Created character: ${char.name}`)
  }

  // Modern Athens Characters
  const modernCharacters = [
    {
      name: 'Dr. Maria Andreadaki',
      wikipediaPageTitle: 'Acropolis_of_Athens',
      birthYear: 1975,
      deathYear: 2050,
      role: 'Archaeologist',
      positionX: 6,
      positionY: 0,
      positionZ: 2,
      modelType: 'female_modern',
      fallbackDescription: 'A modern archaeologist working on restoration of the Acropolis.',
      greetingMessage: 'Hello! I\'m leading the restoration efforts at the Acropolis. It\'s incredible to work among such ancient history.',
    },
    {
      name: 'Yannis Papadopoulos',
      wikipediaPageTitle: 'Athens',
      birthYear: 1960,
      deathYear: 2040,
      role: 'Tour Guide and Historian',
      positionX: -4,
      positionY: 0,
      positionZ: 3,
      modelType: 'male_modern',
      fallbackDescription: 'A local tour guide with deep knowledge of Athenian history.',
      greetingMessage: 'Yassas! Welcome to Athens! I\'ve been giving tours here for 30 years. What would you like to know?',
    },
    {
      name: 'Professor Dimitrios Kallis',
      wikipediaPageTitle: 'History_of_Athens',
      birthYear: 1950,
      deathYear: 2035,
      role: 'History Professor',
      positionX: -8,
      positionY: 0,
      positionZ: -2,
      modelType: 'male_modern',
      fallbackDescription: 'A university professor specializing in ancient and modern Athenian history.',
      greetingMessage: 'Good day. I teach at the University of Athens. Athens has witnessed the entire arc of Western civilization.',
    },
  ]

  for (const char of modernCharacters) {
    await prisma.character.create({
      data: {
        ...char,
        timePeriodId: modernAthens.id,
      },
    })
    console.log(`  ✅ Created character: ${char.name}`)
  }

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
