import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async index(userId: number) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async store(
    userId: number,
    data: { title: string; description?: string },
  ) {
    return this.prisma.project.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async show(userId: number, uuid: string) {
    const project = await this.prisma.project.findUnique({
      where: { uuid },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return project;
  }

  async update(
    userId: number,
    uuid: string,
    data: { title?: string; description?: string },
  ) {
    await this.show(userId, uuid);

    return this.prisma.project.update({
      where: { uuid },
      data,
    });
  }

  async destroy(userId: number, uuid: string) {
    await this.show(userId, uuid);

    await this.prisma.project.delete({
      where: { uuid },
    });
  }
}