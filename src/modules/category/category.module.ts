import { CategoryRepository } from './category.repository';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CategoryService,PrismaService,CategoryRepository],
  controllers: [CategoryController]
})
export class CategoryModule {}
