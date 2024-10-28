import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from './authenticate';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private readonly requiredRole: number) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const result = super.canActivate(context);
    if (!result) {
      return false;
    }
    const request = context.switchToHttp().getRequest<any>();
    const user = request.user;
    // console.log(user.role , this.requiredRole);

    if (!user || !user.role == null || user.role != this.requiredRole) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
