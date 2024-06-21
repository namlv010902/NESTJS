import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { CategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from 'src/middlewares/authenticate';
import { Roles } from 'src/enum/roles.decorator';
import { RolesGuard } from 'src/middlewares/authorization';
import { Role } from 'src/enum/role.enum';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Get("")
    async getCategories(@Res() res: Response) {
        try {
            const result = await this.categoryService.getCategories();
            return res.status(result.statusCode).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // @UseGuards(JwtAuthGuard)
    @UseGuards(new RolesGuard(Role.Admin))
    @Post("")
    async createCategory(@Req() req:Request, @Body() data: CategoryDto, @Res() res: Response) {
        try {
            const result = await this.categoryService.createCategory(data,req);
            return res.status(result.statusCode).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}