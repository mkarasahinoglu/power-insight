import { Module } from "@nestjs/common"
import { FactoryListModule } from "./factory_list/factory_list.module"
import { FactoryDetailsModule } from "./factory_details/factory_details.module"

@Module({
	imports: [FactoryListModule, FactoryDetailsModule]
})
export class AppModule {}
