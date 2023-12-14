import { Module, NestModule, RequestMethod, MiddlewareConsumer} from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"
import { VerifyRegistration } from "src/middleware/VerifyRegistration"
import { JwtModule } from "@nestjs/jwt"


@Module({
  imports: [JwtModule.register({
    global:true
  })],
  controllers: [AuthController],
  providers: [AuthService, DatabaseServiceElasticSearch]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRegistration).forRoutes({path: "users/register", method: RequestMethod.POST})
  }
}