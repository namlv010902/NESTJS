import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryResponse } from './interfaces/category';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) { }

    async getCategories(): Promise<{ data: CategoryDto[], statusCode: number, message: string }> {
        const data = await this.prismaService.category.findMany()
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Categories fetched successfully"
        }
    }

    async createCategory(body: CategoryDto, req: any): Promise<CategoryResponse> {
        const data = await this.prismaService.category.create({
            data: body
        })
        console.log(req.user);
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Categories created successfully"
        }
    }

    async getCategoryById(id: number): Promise<{ data?: CategoryDto, statusCode: number, message: string }> {
        const data = await this.prismaService.category.findUnique({
            where: { id },
        });
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Category not found!"
            }
        }
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Category created successfully"
        }
    }

    async editCategory(id: number, body: CategoryDto): Promise<{ data?: CategoryDto, statusCode: number, message: string }> {
        const data = await this.prismaService.category.update({
            where: { id },
            data: body
        });
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Fetch category failed"
            }
        }
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Category updated successfully"
        }
    }

    async deleteCategory(id: number): Promise<{ data?: CategoryDto, statusCode: number, message: string }> {
        const data = await this.prismaService.category.delete({
            where: { id }
        });
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Fetch category failed"
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: "Category deleted successfully"
        }
    }

}
