import { MiddlewareConsumer, Module, RequestMethod, NestModule } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { VerifyRegistrationV2 } from "src/middleware/VerifyRegistration.v2"
import { TokenBlacklist } from "src/middleware/TokenBlackList"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "./user.model"


@Module({
  imports: [JwtModule.register({
      global: true
    }),
    MongooseModule.forFeature([{name:"User",schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenBlacklist]
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRegistrationV2).forRoutes({path:"auth/register", method: RequestMethod.POST})
  }
}