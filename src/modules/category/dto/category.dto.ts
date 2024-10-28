import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  content: string;
}
