import { Module, NestModule, RequestMethod, MiddlewareConsumer} from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"
import { VerifyRegistration } from "src/middleware/VerifyRegistration"
import { JwtModule } from "@nestjs/jwt"
import { TokenBlacklist } from "src/middleware/TokenBlackList"


@Module({
  imports: [JwtModule.register({
    global:true
  })],
  controllers: [AuthController],
  providers: [AuthService, DatabaseServiceElasticSearch, TokenBlacklist]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRegistration).forRoutes({path: "auth/register", method: RequestMethod.POST})
  }
}