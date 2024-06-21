import { Controller, Post, Body, Res, HttpStatus, HttpException, Get, UseGuards, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/middlewares/authenticate';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) { }

    @Post('register')
    async register(@Body() userData: RegisterDto, @Res() res: Response) {
        try {
            const result = await this.authService.register(userData);
            return res.status(result.statusCode).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Post('login')
    async login(@Body() userData: LoginDto, @Res() res: Response) {
        try {
            const result = await this.authService.login(userData, res);
            return res.status(result.statusCode).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request, @Res() res: Response) {
        const result = await this.authService.me(req.user);
        return res.status(result.statusCode).json(result);
    }
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        const result = this.authService.logout(req, res);
        return res.status(result.statusCode).json(result);
    }
}
