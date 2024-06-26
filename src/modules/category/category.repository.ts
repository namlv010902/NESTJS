import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Category } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findUnique(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create(data: CategoryDto): Promise<Category> {
    
    return this.prisma.category.create({ data });
  }

  async update(id: number, data: CategoryDto): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
