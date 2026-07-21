import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'UP',
      service: 'HabitHat',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
    };
  }
}