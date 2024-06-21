import { Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Request, Response } from 'express';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get("")
    async getPosts(@Query('page') page: string, @Query('limit') limit: string, @Req() req: Request, @Res() res: Response) {
        try {
            const pageNumber = parseInt(page) || 1;
            const perPage = parseInt(limit) || 10;

            const result = await this.postService.getPosts(pageNumber, perPage);
            return res.status(result.statusCode).json(result);

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Post("")
    async createPost() {
        return "create post";
    }

    @Get("/:id")
    async getDetailPost() {
        return "get detail post";
    }

    @Patch("/:id")
    async editPost() {
        return "edit  post";
    }
    
    @Delete("/:id")
    async deletePost() {
        return "Delete post";
    }
}
