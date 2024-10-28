import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Request, Response } from 'express';
import { handleError } from 'src/utils/utility';
import { PostDto } from './dto/post.dto';
import { RolesGuard } from 'src/middlewares/authorization';
import { Role } from 'src/constants/role';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(new RolesGuard(Role.Admin))
  @Get('')
  async getPosts(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Query('keyword') keyword,
    @Query('categoryId') categoryId,
    @Res() res: Response,
  ) {
    try {
      const result = await this.postService.getPosts({
        page,
        perPage,
        keyword,
        categoryId,
      });
      return res.status(200).json(result);
    } catch (error) {
      handleError(error);
    }
  }

  @UseGuards(new RolesGuard(Role.Admin))
  @Post('')
  async createPost(@Body() body: PostDto, @Res() res: Response) {
    try {
      const result = await this.postService.createPost(body);
      return res.status(result.statusCode).json(result);
    } catch (error) {
      handleError(error);
    }
  }

  @Get('/:id')
  async getDetailPost(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.postService.getPostById(parseInt(id));
      return res.status(result.statusCode).json(result);
    } catch (error) {
      handleError(error);
    }
  }

  @UseGuards(new RolesGuard(Role.Admin))
  @Patch('/:id')
  async editPost(
    @Param('id') id: string,
    @Body() data: PostDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.postService.updatePost(parseInt(id), data);
      return res.status(result.statusCode).json(result);
    } catch (error) {
      handleError(error);
    }
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.postService.deletePost(parseInt(id));
      return res.status(result.statusCode).json(result);
    } catch (error) {
      handleError(error);
    }
  }
}
