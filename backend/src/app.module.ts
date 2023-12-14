import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { FactoryListModule } from "./factory_list/factory_list.module"
import { FactoryDetailsModule } from "./factory_details/factory_details.module"
import { AuthModule } from "./user/auth.module"
import { APP_GUARD } from "@nestjs/core"
import { AuthGuard } from "./user/auth.guard"

@Module({
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
	imports: [
		ConfigModule.forRoot({envFilePath:".env",isGlobal:true}),
		FactoryListModule, 
		FactoryDetailsModule,
		AuthModule
	]
})
export class AppModule {}
