// user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(data: User): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
