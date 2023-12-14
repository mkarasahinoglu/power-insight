import { Controller, Post, Body } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "./dto/createUser.dto"
import { SignInUserDto } from "./dto/signInUser.dto"
import { Public } from "src/Utils/constants"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Public()
  @Post("register")
  async registerUser(@Body() createUserDto:CreateUserDto) {
    const registeredUser = await this.authService.registerUser(createUserDto)
    return "User registered"
  }

  @Public()
  @Post("signin")
  async signInUser(@Body() signInUserDto: SignInUserDto) {
    const accessToken = await this.authService.signInUser(signInUserDto.email, signInUserDto.password)
    return accessToken
  }
}