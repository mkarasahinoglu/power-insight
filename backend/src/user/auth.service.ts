import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "./dto/createUser.dto"
import { JwtService } from "@nestjs/jwt"
import { TokenBlacklist } from "src/middleware/TokenBlackList";

@Injectable()
export class AuthService{
  constructor(
    private readonly databaseServiceElasticSearch: DatabaseServiceElasticSearch,
    private readonly jwtService: JwtService,
    private readonly tokenBlackList: TokenBlacklist
    ) {}

  async registerUser(createUserDto) {
    try {
      const saltRounds = parseInt(process.env.SALT_ROUNDS)
      const hashedPassword =  await bcrypt.hash(createUserDto.password, saltRounds)
      await this.databaseServiceElasticSearch.getClient().index({
        index: "users",
        document: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
          role: createUserDto.role
        }
      })
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
      const user = await this.databaseServiceElasticSearch.getClient().search({
        query: {
          term: {
            "email.keyword": email
          }
        }
      })
  
      if(user.hits.hits.length == 0) {
        throw new NotFoundException("Email or password is incorrect")
      }
  
      const foundUser = (user.hits.hits[0]._source as CreateUserDto)
      const userName = foundUser.name
      const userRole = foundUser.role
      const hashedPassword = foundUser.password
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