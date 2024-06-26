import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { CategoryDto } from './dto/category.dto';
import { RolesGuard } from 'src/middlewares/authorization';
import { handleError } from 'src/utils/utility';
import { Role } from 'src/constants/role';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Get("/keyValueCategory")
    async getCategories(@Res() res: Response) {
        try {
            const result = await this.categoryService.getCategories();
            return res.status(result.statusCode).json(result);
        } catch (error) {
            handleError(error)
        }
    }

    // @UseGuards(JwtAuthGuard)
    @UseGuards(new RolesGuard(Role.Admin))
    @Post("")
    async createCategory(@Body() data: CategoryDto, @Res() res: Response) {
        try {
            const result = await this.categoryService.createCategory(data);
            return res.status(result.statusCode).json(result);
        } catch (error) {
            handleError(error)
        }
    }

    @Get("/:id")
    async getDetailCategory(@Param() params: any, @Res() res: Response) {
        try {
            const { id } = params
            const result = await this.categoryService.getCategoryById(parseInt(id))

            return res.status(result.statusCode).json(result);
        } catch (error) {
            handleError(error)
        }
    }

    @UseGuards(new RolesGuard(Role.Admin))
    @Patch("/:id")
    async eitCategory(@Param('id') id: string, @Body() body: CategoryDto, @Res() res: Response) {
        try {
            const result = await this.categoryService.editCategory(parseInt(id), body)
            return res.status(result.statusCode).json(result);
        } catch (error) {
            handleError(error)
        }
    }

    @UseGuards(new RolesGuard(Role.Admin))
    @Delete("/:id")
    async deleteCategory(@Param() params: any, @Res() res: Response) {
        try {
            const { id } = params
            const result = await this.categoryService.deleteCategory(parseInt(id))

            return res.status(result.statusCode).json(result);
        } catch (error) {
            handleError(error)
        }
    }
}