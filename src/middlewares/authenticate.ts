import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        // console.log(request);
        
        const token = request.cookies['accessToken'];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const decoded = jwt.verify(token, 'namdeptrai');
            request.user = decoded;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
