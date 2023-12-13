import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { FactoryListModule } from "./factory_list/factory_list.module"
import { FactoryDetailsModule } from "./factory_details/factory_details.module"
import { UserModule } from "./user/user.module"

@Module({
	imports: [
		ConfigModule.forRoot({envFilePath:".env",isGlobal:true}),
		FactoryListModule, 
		FactoryDetailsModule,
		UserModule
	]
})
export class AppModule {}
