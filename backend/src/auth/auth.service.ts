import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service";

import * as bcrypt from "bcrypt";

import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ) {

    const existing = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {

      throw new UnauthorizedException(
        "Email already exists",
      );

    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({

      data: {

        name,

        email,

        password: hash,

      },

    });

    const { password: _, ...safeUser } = user;

    return {
    accessToken: this.jwt.sign({
        sub: user.id,
        email: user.email,
    }),
    user: safeUser,
    };

  }

  async login(email: string, password: string) {
      console.log("Email:", email);

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      console.log("User:", user);

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      console.log("Entered password:", password);
      console.log("Stored hash:", user.password);

      const valid = await bcrypt.compare(password, user.password);

      console.log("Password valid:", valid);

      if (!valid) {
        throw new UnauthorizedException("Invalid password");
      }

      const { password: _, ...safeUser } = user;

      return {
        accessToken: this.jwt.sign({
          sub: user.id,
          email: user.email,
        }),
        user: safeUser,
      };
}

}