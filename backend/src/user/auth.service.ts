import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "./dto/createUser.dto"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService{
  constructor(
    private readonly databaseServiceElasticSearch: DatabaseServiceElasticSearch,
    private readonly jwtService: JwtService
    ) {}

  async registerUser(createUserDto) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const hashedPassword =  await bcrypt.hash(createUserDto.password, saltRounds)
    console.log(hashedPassword)
    const registeredUser = await this.databaseServiceElasticSearch.getClient().index({
      index: "users",
      document: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role
      }
    })
    return registeredUser
  }

  async signInUser(email: string, password: string) {
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

    const hashedPassword = (user.hits.hits[0]._source as CreateUserDto).password
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

    return accessToken
  }
}