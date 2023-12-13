import { Controller, Post, Body, } from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/createUser.dto"
import { VerifyRegistration } from "src/middleware/VerifyRegistration"


@Controller("users")
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Post("register")
  async registerUser(@Body() createUserDto:CreateUserDto) {
    const registeredUser = await this.userService.registerUser(createUserDto)
    return "User registered."
  }
}