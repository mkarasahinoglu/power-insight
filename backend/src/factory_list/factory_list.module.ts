import { Module } from "@nestjs/common"
import { FactoryListController } from "./factory_list.controller"
import { FactoryListService } from "./factory_list.service"
import { DatabaseServicePostgreSQL } from "src/data/postgresql/postgresql.service"

@Module({
	controllers: [FactoryListController],
	providers: [FactoryListService, DatabaseServicePostgreSQL]
})
export class FactoryListModule {}
