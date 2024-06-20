import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Match } from "./confirmPassword";

export class RegisterDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsNotEmpty()
    @MinLength(6)
    @Match('password', { message: 'confirm_password must match password' })
    confirm_password: string;
    @IsNotEmpty()
    phoneNumber: string;
    role:number
}
export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}