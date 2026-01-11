import { PrismaClient, TaskStatus } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database')

  const password = await bcrypt.hash('password123', 10)

  //user seeder
  const userA = await prisma.user.upsert({
    where: { email: 'usera@mail.com' },
    update: {
      name: 'User A',
    },
    create: {
      uuid: randomUUID(),
      name: 'User A',
      email: 'usera@mail.com',
      password,
    },
  })

  const userB = await prisma.user.upsert({
    where: { email: 'userb@mail.com' },
    update: {
      name: 'User B',
    },
    create: {
      uuid: randomUUID(),
      name: 'User B',
      email: 'userb@mail.com',
      password,
    },
  })

  console.log('Users seeded')

  //project seeder
  const projectA = await prisma.project.create({
    data: {
      uuid: randomUUID(),
      userId: userA.id,
      title: 'User A Project',
      description: 'Project owned by User A',
    },
  })

  const projectB = await prisma.project.create({
    data: {
      uuid: randomUUID(),
      userId: userB.id,
      title: 'User B Project',
      description: 'Project owned by User B',
    },
  })

  console.log('Projects seeded')

  //task seeder
  await prisma.task.createMany({
    data: [
      // Tasks for Project A
      {
        uuid: randomUUID(),
        projectId: projectA.id,
        title: 'Setup database',
        description: 'Create initial database schema',
        status: TaskStatus.pending,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        uuid: randomUUID(),
        projectId: projectA.id,
        title: 'Implement API',
        description: 'Develop REST API endpoints',
        status: TaskStatus.in_progress,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },

      // Tasks for Project B
      {
        uuid: randomUUID(),
        projectId: projectB.id,
        title: 'Initial planning',
        description: 'Plan project structure',
        status: TaskStatus.pending,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        uuid: randomUUID(),
        projectId: projectB.id,
        title: 'Finalize implementation',
        description: 'Complete all features',
        status: TaskStatus.done,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
    ],
  })

  console.log('Tasks seeded')
}

main()
  .catch((e) => {
    console.error('Seeder error', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })