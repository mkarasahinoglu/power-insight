import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export class SignOutUserDto{
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  refreshToken: string
}