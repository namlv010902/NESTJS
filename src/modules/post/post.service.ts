import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginationType, PostResponse, Posts } from './interfaces/post.interface';
import { PostRepository } from './post.repository';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private prismaService: PrismaService,
    ) { }

    async getPosts({ page, perPage, keyword, categoryId }): Promise<{ data: any }> {
        if (page < 1 || !page) page = 1
        if (perPage < 1 || !perPage) perPage = 10
        const data = await this.postRepository.findMany({ page, perPage, keyword, categoryId })
        return data
    }

    async getPostById(id: number): Promise<PostResponse> {
        const data = await this.postRepository.findById(id)
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Post not found!"
            }
        }
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Post fetched successfully"
        }
    }

    async createPost(postData: PostDto): Promise<PostResponse> {
        const categoryIdExist = await this.prismaService.category.findUnique({
            where: {
                id: Number(postData.categoryId)
            }
        })

        if (!categoryIdExist) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Category not found!"
            }
        }
        const data = await this.postRepository.create({ ...postData, categoryId: Number(postData.categoryId) })

        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Post created successfully"
        }
    }
    async updatePost(id: number, postData: PostDto): Promise<PostResponse> {
        const idExist = await this.postRepository.findById(id);
        if (!idExist) return {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Post not found!"
        }
        const categoryIdExist = await this.prismaService.category.findUnique({
            where: {
                id: Number(postData.categoryId)
            }
        })

        if (!categoryIdExist) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Category not found!"
            }
        }
        const data = await this.postRepository.update(Number(id),{ ...postData, categoryId: Number(postData.categoryId) })

        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Post updated successfully"
        }
    }
    async deletePost(id: number): Promise<PostResponse> {
        await this.postRepository.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: "Post deleted successfully"
        }
    }
}
