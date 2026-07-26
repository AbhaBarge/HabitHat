import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async analytics(userId: string) {
  const habits = await this.prisma.habit.findMany({
    where: {
      userId,
    },
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const analytics = days.map((day) => ({
    day,
    completed: 0,
  }));

  habits.forEach((habit) => {
    if (!habit.lastCompletedAt) return;

    const jsDay = habit.lastCompletedAt.getDay();

    // JS: 0=Sun ... 6=Sat
    const index = jsDay === 0 ? 6 : jsDay - 1;

    analytics[index].completed++;
  });

  return analytics;
}

  async create(userId: string, dto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.habit.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(
      id: string,
      userId: string,
      dto: UpdateHabitDto,
    ) {
      const habit = await this.prisma.habit.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!habit) {
        throw new NotFoundException("Habit not found");
      }

      return this.prisma.habit.update({
        where: {
          id,
        },
        data: dto,
      });
    }

  async delete(
    id: string,
    userId: string,
  ) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException("Habit not found");
    }

    await this.prisma.habit.delete({
      where: {
        id,
      },
    });

    return {
      message: "Habit deleted successfully",
    };
  }

  async complete(id: string, userId: string) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!habit)
      throw new NotFoundException();

    return this.prisma.habit.update({
      where: {
        id,
      },
      data: {
        completed: true,
        streak: habit.streak + 1,
        lastCompletedAt: new Date(),
      },
    });
  }

  async stats(userId: string) {
    const habits = await this.prisma.habit.findMany({
      where: {
        userId,
      },
    });

    const total = habits.length;

    const completed = habits.filter(
      (h) => h.streak > 0,
    ).length;

    const completionRate =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    const longestStreak =
      habits.reduce(
        (m, h) => Math.max(m, h.streak),
        0,
      );

    return {
      totalHabits: total,
      completedToday: completed,
      completionRate,
      longestStreak,
    };
  }
}

