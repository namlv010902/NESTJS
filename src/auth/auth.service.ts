import { Injectable, HttpException, HttpStatus, Res, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './schema/auth.dto';
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

    async register(userData: RegisterDto): Promise<{ data?: User, statusCode: number, message?: string }> {
        const { password, email } = userData
        const emailExist = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (emailExist) {
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST)
        }
        const hasPassword = await bcrypt.hash(password, 10)
        const data = {
            ...userData,
            confirm_password: undefined,
            password: hasPassword
        }

        const newUser = await this.prismaService.user.create({ data: data })

        return {
            statusCode: HttpStatus.OK,
            data: newUser,
        };

    }

    async login(userData: LoginDto, res: Response): Promise<{ data?: { user: User, accessToken: string, refreshToken: string }, statusCode: number, message?: string }> {
        const { email, password } = userData
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new HttpException({
                "statusCode": HttpStatus.BAD_REQUEST,
                error: {
                    email: "Email not found!",
                },
                message: "Login failed!",
            }, HttpStatus.BAD_REQUEST);
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new HttpException({
                "statusCode": HttpStatus.BAD_REQUEST,
                error: {
                    password: "Incorrect password!",
                },
                message: "Login failed!"

            }, HttpStatus.BAD_REQUEST);
        }
        const payload = { id: user.id, email: user.email };
        // console.log(payload)

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: "namdeptrai",
            expiresIn: '1d'
        })
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: "namdeptrai-refresh",
            expiresIn: '7d'
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,

        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
        )

        return {
            statusCode: HttpStatus.OK,
            message: "Login successfully!",
            data: {
                user: { ...user, password: undefined },
                accessToken,
                refreshToken
            },
        }

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
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.OK,
            data: { ...userData, password: undefined },
        };
    }

    logout(req: any, res: Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return {
            statusCode: HttpStatus.OK,
            message: "Logout successfully!"
        }
    }
}



