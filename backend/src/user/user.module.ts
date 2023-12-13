import { Module, NestModule, RequestMethod, MiddlewareConsumer} from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"
import { VerifyRegistration } from "src/middleware/VerifyRegistration"


@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseServiceElasticSearch]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRegistration).forRoutes({path: "users/register", method: RequestMethod.POST})
  }
}