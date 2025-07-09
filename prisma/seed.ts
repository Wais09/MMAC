import { PrismaClient, Role, ClassType, MembershipType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@marrickvillemartialarts.com' },
    update: {},
    create: {
      email: 'admin@marrickvillemartialarts.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
      isActive: true,
    },
  })

  // Create trainers
  const trainers = await Promise.all([
    // Josh Allsopp - Head BJJ Instructor
    prisma.user.upsert({
      where: { email: 'josh@marrickvillemartialarts.com' },
      update: {},
      create: {
        email: 'josh@marrickvillemartialarts.com',
        password: await bcrypt.hash('trainer123', 12),
        firstName: 'Josh',
        lastName: 'Allsopp',
        role: Role.TRAINER,
        isActive: true,
      },
    }),
    // Tsuchika Shimoyamada - Wrestling World Champion
    prisma.user.upsert({
      where: { email: 'tsuchika@marrickvillemartialarts.com' },
      update: {},
      create: {
        email: 'tsuchika@marrickvillemartialarts.com',
        password: await bcrypt.hash('trainer123', 12),
        firstName: 'Tsuchika',
        lastName: 'Shimoyamada',
        role: Role.TRAINER,
        isActive: true,
      },
    }),
    // Antonio Mammarella - Head MMA Instructor
    prisma.user.upsert({
      where: { email: 'antonio@marrickvillemartialarts.com' },
      update: {},
      create: {
        email: 'antonio@marrickvillemartialarts.com',
        password: await bcrypt.hash('trainer123', 12),
        firstName: 'Antonio',
        lastName: 'Mammarella',
        role: Role.TRAINER,
        isActive: true,
      },
    }),
    // Bastian Ayala - Muay Thai Specialist
    prisma.user.upsert({
      where: { email: 'bastian@marrickvillemartialarts.com' },
      update: {},
      create: {
        email: 'bastian@marrickvillemartialarts.com',
        password: await bcrypt.hash('trainer123', 12),
        firstName: 'Bastian',
        lastName: 'Ayala',
        role: Role.TRAINER,
        isActive: true,
      },
    }),
    // Johana Reyes Lagos - Women's Muay Thai
    prisma.user.upsert({
      where: { email: 'johana@marrickvillemartialarts.com' },
      update: {},
      create: {
        email: 'johana@marrickvillemartialarts.com',
        password: await bcrypt.hash('trainer123', 12),
        firstName: 'Johana',
        lastName: 'Reyes Lagos',
        role: Role.TRAINER,
        isActive: true,
      },
    }),
  ])

  // Create class schedule
  const classes = [
    // Monday Classes
    {
      name: 'No-Gi BJJ All Levels',
      type: ClassType.BJJ,
      description: 'Brazilian Jiu-Jitsu without the traditional gi. Focus on grappling, submissions, and ground control.',
      dayOfWeek: 1, // Monday
      startTime: '18:00',
      endTime: '19:30',
      duration: 90,
      maxCapacity: 16,
      price: 35.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },
    {
      name: 'Kids BJJ (Ages 5-12)',
      type: ClassType.KIDS_BJJ,
      description: 'Fun and educational Brazilian Jiu-Jitsu for children. Focus on discipline, confidence, and basic techniques.',
      dayOfWeek: 1, // Monday
      startTime: '17:00',
      endTime: '17:40',
      duration: 40,
      maxCapacity: 12,
      price: 25.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },

    // Tuesday Classes
    {
      name: 'Muay Thai Fundamentals',
      type: ClassType.MUAY_THAI,
      description: 'Learn the Art of Eight Limbs. Traditional Muay Thai techniques including kicks, punches, elbows, and knees.',
      dayOfWeek: 2, // Tuesday
      startTime: '18:30',
      endTime: '19:30',
      duration: 60,
      maxCapacity: 20,
      price: 35.00,
      trainerId: trainers[3].id, // Bastian Ayala
      isActive: true,
    },
    {
      name: 'No-Gi BJJ All Levels',
      type: ClassType.BJJ,
      description: 'Brazilian Jiu-Jitsu without the traditional gi.',
      dayOfWeek: 2, // Tuesday
      startTime: '18:00',
      endTime: '19:00',
      duration: 60,
      maxCapacity: 16,
      price: 35.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },

    // Wednesday Classes
    {
      name: 'Wrestling Technique',
      type: ClassType.WRESTLING,
      description: 'Olympic wrestling techniques taught by world champion Tsuchika Shimoyamada. Takedowns, throws, and ground control.',
      dayOfWeek: 3, // Wednesday
      startTime: '18:00',
      endTime: '19:00',
      duration: 60,
      maxCapacity: 14,
      price: 35.00,
      trainerId: trainers[1].id, // Tsuchika Shimoyamada
      isActive: true,
    },
    {
      name: 'Kids BJJ (Ages 5-12)',
      type: ClassType.KIDS_BJJ,
      description: 'Fun Brazilian Jiu-Jitsu for kids.',
      dayOfWeek: 3, // Wednesday
      startTime: '17:00',
      endTime: '17:40',
      duration: 40,
      maxCapacity: 12,
      price: 25.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },

    // Thursday Classes
    {
      name: 'No-Gi BJJ All Levels',
      type: ClassType.BJJ,
      description: 'Brazilian Jiu-Jitsu advanced techniques and sparring.',
      dayOfWeek: 4, // Thursday
      startTime: '18:00',
      endTime: '19:30',
      duration: 90,
      maxCapacity: 16,
      price: 35.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },
    {
      name: 'MMA Training',
      type: ClassType.MMA,
      description: 'Mixed Martial Arts combining striking, grappling, and ground fighting techniques.',
      dayOfWeek: 4, // Thursday
      startTime: '19:30',
      endTime: '20:30',
      duration: 60,
      maxCapacity: 18,
      price: 35.00,
      trainerId: trainers[2].id, // Antonio Mammarella
      isActive: true,
    },

    // Friday Classes
    {
      name: 'Muay Thai Advanced',
      type: ClassType.MUAY_THAI,
      description: 'Advanced Muay Thai techniques, sparring, and conditioning.',
      dayOfWeek: 5, // Friday
      startTime: '18:00',
      endTime: '19:00',
      duration: 60,
      maxCapacity: 20,
      price: 35.00,
      trainerId: trainers[3].id, // Bastian Ayala
      isActive: true,
    },
    {
      name: 'Open Mat BJJ',
      type: ClassType.BJJ,
      description: 'Open mat session for sparring and drilling techniques with supervision.',
      dayOfWeek: 5, // Friday
      startTime: '19:00',
      endTime: '20:00',
      duration: 60,
      maxCapacity: 20,
      price: 25.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },

    // Saturday Classes
    {
      name: 'Women\'s Muay Thai',
      type: ClassType.WOMENS_MUAY_THAI,
      description: 'Empowering Muay Thai classes exclusively for women in a supportive environment.',
      dayOfWeek: 6, // Saturday
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      maxCapacity: 15,
      price: 35.00,
      trainerId: trainers[4].id, // Johana Reyes Lagos
      isActive: true,
    },
    {
      name: 'Kids Muay Thai (Ages 6-14)',
      type: ClassType.KIDS_MUAY_THAI,
      description: 'Traditional Muay Thai for kids with focus on discipline, fitness, and technique.',
      dayOfWeek: 6, // Saturday
      startTime: '11:00',
      endTime: '11:45',
      duration: 45,
      maxCapacity: 12,
      price: 25.00,
      trainerId: trainers[3].id, // Bastian Ayala
      isActive: true,
    },
    {
      name: 'Competition Training',
      type: ClassType.MMA,
      description: 'Advanced training for competitors. High intensity drilling and sparring.',
      dayOfWeek: 6, // Saturday
      startTime: '12:00',
      endTime: '13:30',
      duration: 90,
      maxCapacity: 10,
      price: 45.00,
      trainerId: trainers[2].id, // Antonio Mammarella
      isActive: true,
    },

    // Sunday Classes
    {
      name: 'Fundamentals Workshop',
      type: ClassType.MMA,
      description: 'Mixed fundamentals covering basic techniques from all disciplines.',
      dayOfWeek: 0, // Sunday
      startTime: '10:00',
      endTime: '11:30',
      duration: 90,
      maxCapacity: 20,
      price: 35.00,
      trainerId: trainers[2].id, // Antonio Mammarella
      isActive: true,
    },
    {
      name: 'Recovery & Mobility',
      type: ClassType.BJJ,
      description: 'Low intensity stretching, mobility work, and light drilling for recovery.',
      dayOfWeek: 0, // Sunday
      startTime: '11:30',
      endTime: '12:30',
      duration: 60,
      maxCapacity: 25,
      price: 25.00,
      trainerId: trainers[0].id, // Josh Allsopp
      isActive: true,
    },
  ]

  // Create all classes
  const createdClasses = await Promise.all(
    classes.map(async (classData) => {
      return await prisma.class.upsert({
        where: {
          // Create a unique identifier based on name, day, and time
          id: `${classData.name}_${classData.dayOfWeek}_${classData.startTime}`.replace(/\s+/g, '_').toLowerCase(),
        },
        update: classData,
        create: {
          id: `${classData.name}_${classData.dayOfWeek}_${classData.startTime}`.replace(/\s+/g, '_').toLowerCase(),
          ...classData,
        },
      })
    })
  )

  // Create sample members
  const sampleMembers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'sarah.wilson@email.com' },
      update: {},
      create: {
        email: 'sarah.wilson@email.com',
        password: await bcrypt.hash('member123', 12),
        firstName: 'Sarah',
        lastName: 'Wilson',
        phone: '0412345678',
        dateOfBirth: new Date('1990-05-15'),
        role: Role.MEMBER,
        membershipType: MembershipType.UNLIMITED,
        membershipStart: new Date(),
        membershipEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        emergencyContactName: 'John Wilson',
        emergencyContactPhone: '0498765432',
        emergencyRelationship: 'spouse',
        waiverSigned: true,
        waiverSignedDate: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike.chen@email.com' },
      update: {},
      create: {
        email: 'mike.chen@email.com',
        password: await bcrypt.hash('member123', 12),
        firstName: 'Mike',
        lastName: 'Chen',
        phone: '0423456789',
        dateOfBirth: new Date('1985-08-22'),
        role: Role.MEMBER,
        membershipType: MembershipType.TWO_X_PLAN,
        membershipStart: new Date(),
        membershipEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
        emergencyContactName: 'Lisa Chen',
        emergencyContactPhone: '0487654321',
        emergencyRelationship: 'spouse',
        waiverSigned: true,
        waiverSignedDate: new Date(),
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log('👑 Admin user created:', admin.email)
  console.log('👨‍🏫 Trainers created:', trainers.length)
  console.log('🏋️ Classes created:', createdClasses.length)
  console.log('👥 Sample members created:', sampleMembers.length)
  console.log('🔑 Default password for all users: admin123, trainer123, member123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
