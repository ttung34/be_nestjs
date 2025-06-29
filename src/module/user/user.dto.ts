import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password  : string
}


export class LoginDto{

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
    
}