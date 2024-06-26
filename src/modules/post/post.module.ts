import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { PostRepository } from './post.repository';

@Module({
  providers: [PostService,PrismaService,PostRepository],
  controllers: [PostController]
})
export class PostModule {}
