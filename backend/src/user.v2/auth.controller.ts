import { Body, Controller, HttpException, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "./dto/createUser.dto"
import { SignInUserDto } from "./dto/signInUser.dto"
import { SignOutUserDto } from "./dto/signOutUser.dto"
import { Public } from "src/Utils/constants"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      const registeredUser = await this.authService.registerUser(createUserDto)
      return registeredUser
    }
    catch (err) {
      throw new HttpException(
        err.message,
        err.status
      )
    }
  }

  @Public()
  @Post("signin")
  async signInUser(@Body() signInUserDto: SignInUserDto) {
    try {
      const { userName, userRole, accessToken, refreshToken } = await this.authService.signInUser(signInUserDto.email, signInUserDto.password)
      return { userName, userRole, accessToken, refreshToken }
    }
    catch (err) {
      throw new HttpException(
        err.message,
        err.status
      )
    }
  }

  @Public()
  @Post("refreshToken")
  async refreshToken(@Body() body: any) {
    try{
      const newAccessToken = await this.authService.refreshToken(body.refreshToken)
      return newAccessToken
    }
    catch(err) {
      throw new HttpException(
        err.message,
        err.status
      )
    }
  }

  @Post("signout")
  async signOutUser(@Body() signOutUserDto: SignOutUserDto) {
    try {
      const signedOut = await this.authService.signOutUser(signOutUserDto.email, signOutUserDto.refreshToken)
      return signedOut
    }
    catch(err) {
      throw new HttpException(
        err.message,
        err.status
      )
    }
  }
}