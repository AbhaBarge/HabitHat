import { Module } from "@nestjs/common";

import { PrismaModule } from "./database/prisma.module";
import { HealthModule } from "./health/health.module";
import { UserModule } from "./user/user.module";
import { HabitModule } from "./habit/habit.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    UserModule,
    HabitModule,
    AuthModule,
  ],
})
export class AppModule {}