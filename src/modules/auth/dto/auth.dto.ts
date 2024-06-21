import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Match } from "./confirmPassword.dto";

export class RegisterDto{
    @IsNotEmpty({
        message: 'Name is required'
    })
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsNotEmpty()
    @MinLength(6)
    @Match('password', { message: 'Confirm password must match password' })
    confirmPassword: string;
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