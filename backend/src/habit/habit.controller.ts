import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

import { HabitService } from "./habit.service";

import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";

@Controller("habits")
@UseGuards(JwtAuthGuard)
export class HabitController {
  constructor(private service: HabitService) {}

  @Post()
  create(
    @Req() req,
    @Body() dto: CreateHabitDto,
  ) {
    return this.service.create(
      req.user.userId,
      dto,
    );
  }

  @Get()
  findAll(@Req() req) {
    return this.service.findAll(
      req.user.userId,
    );
  }

  @Get("stats")
  stats(@Req() req) {
    return this.service.stats(
      req.user.userId,
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Req() req,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.service.update(
      id,
      req.user.userId,
      dto,
    );
  }

  @Delete(":id")
  delete(
    @Param("id") id: string,
    @Req() req,
  ) {
    return this.service.delete(
      id,
      req.user.userId,
    );
  }

  @Post(":id/complete")
  complete(
    @Param("id") id: string,
    @Req() req,
  ) {
    return this.service.complete(
      id,
      req.user.userId,
    );
  }
}