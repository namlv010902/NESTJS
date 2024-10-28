import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany({ page, perPage, keyword, categoryId }): Promise<any> {
    // console.log(categoryId);

    const skip = (page - 1) * perPage;
    const take = parseInt(perPage);
    let query = {};

    if (keyword) {
      query = {
        OR: [
          { title: { contains: keyword.toLowerCase() } },
          { content: { contains: keyword.toLowerCase() } },
        ],
      };
    }
    if (categoryId) {
      query = {
        ...query,
        categoryId: {
          equals: Number(categoryId),
        },
      };
    }
    const totalItems = await this.prisma.post.count({
      where: query,
    });

    const data = await this.prisma.post.findMany({
      where: query,
      skip,
      take,
      orderBy: {
        id: 'desc',
      },
      include: {
        category: true,
      },
    });

    const currentPage = Number(page);
    const totalPage = Number(Math.ceil(totalItems / perPage));
    return {
      data,
      meta: {
        totalItems: data.length,
        currentPage,
        totalPage,
        perPage: take,
      },
    };
  }
  async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: PostDto): Promise<Post> {
    return this.prisma.post.create({ data });
  }
  async update(id: number, data: PostDto): Promise<Post> {
    return this.prisma.post.update({ where: { id }, data });
  }
  async delete(id: number) {
    return this.prisma.post.delete({
      where: { id: id },
    });
  }
}
