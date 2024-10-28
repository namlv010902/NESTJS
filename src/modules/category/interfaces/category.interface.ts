import { CategoryDto } from '../dto/category.dto';

export interface CategoryResponse {
  data?: CategoryDto | CategoryDto[];
  statusCode: number;
  message: string;
}
type KeyValues = {
  label: string;
  value: number;
};

export interface CategoryKeyValueResponse
  extends Pick<CategoryResponse, 'statusCode' | 'message'> {
  data: KeyValues[];
}
