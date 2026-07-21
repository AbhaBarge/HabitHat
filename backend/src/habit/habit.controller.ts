import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HabitService } from './habit.service';

@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  create(
    @Body()
    body: {
      title: string;
      userId: string;
    },
  ) {
    return this.habitService.create(body.title, body.userId);
  }

  @Get()
  getHabits(@Query('userId') userId: string) {
    return this.habitService.findAll(userId);
  }
}