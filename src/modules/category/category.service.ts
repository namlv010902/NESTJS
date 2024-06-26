import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryKeyValueResponse, CategoryResponse } from './interfaces/category.interface';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async getCategories(): Promise<CategoryKeyValueResponse> {
        const data = await this.categoryRepository.findMany()
        const categories = data.map((category: any) => {
            return {
                label: category.name,
                value: category.id
            }
        }

        )
        return {
            data: categories,
            statusCode: HttpStatus.OK,
            message: "Categories fetched successfully"
        }
    }

    async createCategory(body: CategoryDto): Promise<CategoryResponse> {
        const data = await this.categoryRepository.create(body);
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Categories created successfully"
        }
    }

    async getCategoryById(id: number): Promise<CategoryResponse> {
        const data = await this.categoryRepository.findUnique(id);
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Category not found!"
            }
        }
        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Fetch category successfully"
        }
    }

    async editCategory(id: number, body: CategoryDto): Promise<CategoryResponse> {

        const existId = await this.categoryRepository.findUnique(id)
        if (!existId) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Category not found!",
            }
        }
        const data = await this.categoryRepository.update(id, body)

        return {
            data: data,
            statusCode: HttpStatus.OK,
            message: "Category updated successfully"
        }
    }

    async deleteCategory(id: number): Promise<CategoryResponse> {
        const data = await this.categoryRepository.delete(id)
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
