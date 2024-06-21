import { CategoryDto } from '../dto/category.dto';

export interface CategoryResponse {
    data?: CategoryDto; 
    statusCode: number; 
    message: string; 
}
