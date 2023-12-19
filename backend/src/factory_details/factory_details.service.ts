import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { DatabaseServicePostgreSQL } from "src/data/postgresql/postgresql.service"

@Injectable()
export class FactoryDetailsService {
	constructor(
		private readonly databaseServicePostgreSQL: DatabaseServicePostgreSQL
	) {}

	async getFactoryDetails(factoryId) {
		try {
			const factoryDetails = await this.databaseServicePostgreSQL.query(
				`SELECT * FROM factory_details WHERE factory_id=${factoryId} ORDER BY factory_id`
			)
			return factoryDetails.rows
		}
		catch(err) {
			throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
		}
	}

	async updateFactoryDetails(id, updateFactoryDetailsDto) {
		try {
			const updatedFactoryDetails = await this.databaseServicePostgreSQL.query(
				`UPDATE factory_details SET using_unit='${updateFactoryDetailsDto.using_unit}', 
				date_range='${updateFactoryDetailsDto.date_range}'::daterange, 
				usage_kw='${updateFactoryDetailsDto.usage_kw}', 
				usage_cost='${updateFactoryDetailsDto.usage_cost}', 
				discount='${updateFactoryDetailsDto.discount}'
				WHERE id=${id}`
			)
			return true
		}
		catch(err) {
			throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
		}
	}
}
