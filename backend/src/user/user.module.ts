import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"


@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseServiceElasticSearch]
})
export class UserModule {}