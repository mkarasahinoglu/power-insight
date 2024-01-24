import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { IUser } from "./user.model"
import { CreateUserDto } from "./dto/createUser.dto"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { TokenBlacklist } from "src/middleware/TokenBlackList"


@Injectable()
export class AuthService{
  constructor(
    @InjectModel("User") private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
    private readonly tokenBlackList: TokenBlacklist
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const saltRounds = parseInt(process.env.SALT_ROUNDS)
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)
      createUserDto.password = hashedPassword
      const registeredUser = await this.userModel.create(createUserDto)
      await registeredUser.save()
      return true
    }
    catch (err) {
      throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async signInUser(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({email: email})
      if(!user) {
        throw new NotFoundException("Email or password is incorrect")
      }
      
      const userName = user.name
      const userRole = user.role
      const hashedPassword = user.password
      const isMatch = await bcrypt.compare(password, hashedPassword)

      if(!isMatch) {
        throw new UnauthorizedException("Email or password is incorrect")
      }

      const accessToken = await this.jwtService.signAsync(
        {email: email},
        {secret: process.env.ACCESS_TOKEN_KEY, 
         expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
      )
  
      const refreshToken = await this.jwtService.signAsync(
        {email: email},
        {secret: process.env.REFRESH_TOKEN_KEY, 
         expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        }
      )
  
      return { userName, userRole, accessToken, refreshToken }
    }
    catch (err) {
      throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {secret: process.env.REFRESH_TOKEN_KEY})
      
      if(this.tokenBlackList.isTokenBlacklisted(decoded.email, refreshToken)) {
        throw new UnauthorizedException("Invalid Session")
      }
      const newAccessToken = await this.jwtService.signAsync(
        {email: decoded.email},
        {secret: process.env.ACCESS_TOKEN_KEY, 
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
      )
    
      return { newAccessToken }
    }
    catch (err) {
      throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.FORBIDDEN
      )
    }
  }

  async signOutUser(email: string, refreshToken: string) {
    try {
      this.tokenBlackList.addToBlacklist(email, refreshToken)
      return "Signed Out"
    }
    catch(err) {
      throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}