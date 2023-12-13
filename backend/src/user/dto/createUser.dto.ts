import { IsString, IsNotEmpty, IsEmail, Length, Matches } from "class-validator"

export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  @Length(8, 25, { message: 'Name must be at least 8 characters long' })
  @Matches(/^[^\d]+$/, { message: 'Name must not include numeric values' })
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, { message: 'Password must contain at least one uppercase letter and one numeric character' })
  @Length(8, 8, { message: 'Password must be 8 characters long' })
  password: string

  @IsNotEmpty()
  @IsString()
  role: string
}