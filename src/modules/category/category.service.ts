import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private prismaService : PrismaService){}

    async getCategories(): Promise<{data:CategoryDto[],statusCode:number,message:string}>{
     const data = await this.prismaService.category.findMany()
     return {
        data: data,
        statusCode:HttpStatus.OK,
        message:"Categories fetched successfully"
     }
    }

    async createCategory(body:CategoryDto, req:any): Promise<{data:CategoryDto,statusCode:number,message:string}>{
        const data = await this.prismaService.category.create({
            data:body
        })
        console.log(req.user);
        return {
           data: data,
           statusCode:HttpStatus.OK,
           message:"Categories created successfully"
        }
       }
}
