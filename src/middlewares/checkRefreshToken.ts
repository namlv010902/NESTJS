import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    // console.log(request);

    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refreshToken provided');
    }

    try {
      const decoded = jwt.verify(refreshToken, 'namdeptrai-refresh');
      request.user = decoded;
      return true;
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token has expired');
      }
      throw new UnauthorizedException('Invalid refreshToken');
    }
  }
}
