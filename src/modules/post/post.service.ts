import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {}

    async getPosts(page: number, limit: number): Promise<{ data?: any, statusCode: number, message?: string }> {
        const skip = (page - 1) * limit;
        const take = limit;

        const [posts, total] = await Promise.all([
            this.prismaService.post.findMany({
                skip,
                take,
            }),
            this.prismaService.post.count(),
        ]);

        return {
            data: {
                posts,
                total,
                page,
                perPage: limit,
                totalPages: Math.ceil(total / limit),
            },
            statusCode: HttpStatus.OK,
            message: "Posts fetched successfully",
        };
    }
}
