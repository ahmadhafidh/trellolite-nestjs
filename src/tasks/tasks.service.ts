import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { TaskStatus } from '@prisma/client'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  private async getProjectOrFail(userId: number, projectUuid: string) {
    const project = await this.prisma.project.findUnique({
      where: { uuid: projectUuid },
    })

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('Access denied')
    }

    return project
  }

  private async getTaskOrFail(
    projectId: number,
    taskUuid: string,
  ) {
    const task = await this.prisma.task.findUnique({
      where: { uuid: taskUuid },
    })

    if (!task || task.projectId !== projectId) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  async index(userId: number, projectUuid: string) {
    const project = await this.getProjectOrFail(userId, projectUuid)

    return this.prisma.task.findMany({
      where: {
        projectId: project.id,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async store(
    userId: number,
    projectUuid: string,
    data: {
      title: string
      description?: string
      status?: TaskStatus
      due_date?: Date
    },
  ) {
    const project = await this.getProjectOrFail(userId, projectUuid)

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status ?? TaskStatus.pending,
        dueDate: data.due_date,
        projectId: project.id,
      },
    })
  }

  async show(
    userId: number,
    projectUuid: string,
    taskUuid: string,
  ) {
    const project = await this.getProjectOrFail(userId, projectUuid)

    return this.getTaskOrFail(project.id, taskUuid)
  }

  async update(
    userId: number,
    projectUuid: string,
    taskUuid: string,
    data: {
      title?: string
      description?: string
      status?: TaskStatus
      due_date?: Date
    },
  ) {
    const project = await this.getProjectOrFail(userId, projectUuid)
    await this.getTaskOrFail(project.id, taskUuid)

    return this.prisma.task.update({
      where: { uuid: taskUuid },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.due_date,
      },
    })
  }

  async destroy(
    userId: number,
    projectUuid: string,
    taskUuid: string,
  ) {
    const project = await this.getProjectOrFail(userId, projectUuid)
    await this.getTaskOrFail(project.id, taskUuid)

    await this.prisma.task.delete({
      where: { uuid: taskUuid },
    })
  }
}