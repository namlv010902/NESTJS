
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthService } from 'src/auth/jwt.service';

@Injectable()
export class JwtRefreshMiddleware implements NestMiddleware {
  constructor(private authService: JwtAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies['refreshToken'];

    if (refreshToken) {
      try {
        const decoded = await this.authService.verifyRefreshToken(refreshToken);
        const accessToken = await this.authService.generateAccessToken(decoded);

        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000, 
        });

        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
      }
    } else {

      res.status(401).json({ message: 'No refresh token provided' });
    }
  }
}
