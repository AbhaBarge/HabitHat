import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
        create(
        @Body()
        body: {
            name: string;
            email: string;
            password: string;
        },
        ) {
        return this.userService.create(
            body.name,
            body.email,
            body.password,
        );
        }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }
}