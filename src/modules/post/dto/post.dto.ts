import { IsNotEmpty } from 'class-validator';

export class PostDto {
  id: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  categoryId: number;
}
