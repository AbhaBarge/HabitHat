import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, userId: string) {
    return this.prisma.habit.create({
      data: {
        title,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.habit.findMany({
      where: {
        userId,
      },
    });
  }
}