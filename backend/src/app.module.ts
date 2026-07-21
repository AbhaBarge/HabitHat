import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './user/user.module';
import { HabitModule } from './habit/habit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    UserModule,
    HabitModule,
  ],
})
export class AppModule {}