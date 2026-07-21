import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      if (existingUser.password !== password) {
        throw new UnauthorizedException('Invalid password');
      }

      return existingUser;
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}