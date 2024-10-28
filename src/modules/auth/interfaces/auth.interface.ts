import { RegisterDto } from '../dto/auth.dto';

export interface RegisterResponse {
  data: RegisterDto;
  statusCode: number;
  message: string;
}
