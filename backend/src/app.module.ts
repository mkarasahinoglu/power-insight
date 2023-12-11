import { Module } from "@nestjs/common"
import { FactoryListModule } from "./factory_list/factory_list.module"

@Module({
	imports: [FactoryListModule]
})
export class AppModule {}
