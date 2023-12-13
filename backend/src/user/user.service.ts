import { Injectable } from "@nestjs/common";
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"

@Injectable()
export class UserService{
  constructor(private readonly databaseServiceElasticSearch:DatabaseServiceElasticSearch) {}

  async registerUser(createUserDto) {
    const registeredUser = await this.databaseServiceElasticSearch.getClient().index({
      index: "users",
      document: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role
      }
    })
    return registeredUser
  }
}