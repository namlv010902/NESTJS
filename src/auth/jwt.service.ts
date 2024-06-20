
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthService {
  verifyRefreshToken(refreshToken: any) {
      throw new Error('Method not implemented.');
  }
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '15m', 
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '7d', 
    });
  }


}
