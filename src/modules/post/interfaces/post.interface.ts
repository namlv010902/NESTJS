import { PostDto } from '../dto/post.dto';

export interface PostResponse {
  statusCode: number;
  message: string;
  data?: PostDto | PostDto[];
}
export interface PostQuery {
  keyWord: string;
  perPage: number;
  page: number;
}
export interface Posts {
  id: number;
  title: string;
  content: string;
  image: string;
  categoryId: number;
}
export interface PaginationType {
  totalPages: number;
  currentPage: number;
  totalItems: number;
  perPage: number;
}
