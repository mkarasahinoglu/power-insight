import { Module } from "@nestjs/common"
import { FactoryDetailsController } from "./factory_details.controller"
import { FactoryDetailsService } from "./factory_details.service"
import { DatabaseServicePostgreSQL } from "src/data/postgresql/postgresql.service"

@Module({
  controllers: [FactoryDetailsController],
  providers: [FactoryDetailsService, DatabaseServicePostgreSQL]
})
export class FactoryDetailsModule {}