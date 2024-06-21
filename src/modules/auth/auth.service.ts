import { Injectable, HttpException, HttpStatus, Res, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    private async generateTokens(payload: any): Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: "namdeptrai",
            expiresIn: '1d'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: "namdeptrai-refresh",
            expiresIn: '7d'
        });
        return { accessToken, refreshToken };
    }

    private handleError(statusCode: HttpStatus, message: string, error?: any): void {
        throw new HttpException({ statusCode, message, error }, statusCode);
    }

    private async findUserByEmail(email: string): Promise<User> {
        return this.prismaService.user.findUnique({ where: { email } });
    }

    private createResponse(statusCode: number, message: string, data?: any) {
        return { statusCode, message, data };
    }

    async register(userData: RegisterDto): Promise<{ data?: User, statusCode: number, message?: string }> {
        const { password, email } = userData;
        const emailExist = await this.findUserByEmail(email);
        if (emailExist) {
            this.handleError(HttpStatus.BAD_REQUEST, "Register failed", {email:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            ...userData,
            confirmPassword: undefined,
            password: hashedPassword
        };

        const newUser = await this.prismaService.user.create({ data });
        return this.createResponse(HttpStatus.OK, "Registration successful", newUser);
    }

    async login(userData: LoginDto, res: Response): Promise<{ data?: { user: User, accessToken: string, refreshToken: string }, statusCode: number, message?: string }> {
        const { email, password } = userData;
        const user = await this.findUserByEmail(email);
        if (!user) {
            this.handleError(HttpStatus.BAD_REQUEST, "Login failed!", { email: "Email not found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            this.handleError(HttpStatus.BAD_REQUEST, "Login failed!", { password: "Incorrect password!" });
        }
        const payload = { id: user.id, email: user.email,role: user.role};
        const { accessToken, refreshToken } = await this.generateTokens(payload);

        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return this.createResponse(HttpStatus.OK, "Login successful", {
            user: { ...user, password: undefined },
            accessToken,
            refreshToken
        });
    }

    async me(user: any): Promise<{ data?: User, statusCode: number, message?: string }> {
        const userData = await this.prismaService.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                phoneNumber: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        if (!userData) {
            this.handleError(HttpStatus.NOT_FOUND, "User not found");
        }
        return this.createResponse(HttpStatus.OK, "User fetched successfully", { ...userData, password: undefined });
    }

    logout(req: any, res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return this.createResponse(HttpStatus.OK, "Logout successful");
    }
}
