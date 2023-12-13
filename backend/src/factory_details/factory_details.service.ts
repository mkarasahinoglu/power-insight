import { Injectable } from "@nestjs/common"
import { DatabaseServicePostgreSQL } from "src/data/postgresql/postgresql.service"

@Injectable()
export class FactoryDetailsService {
	constructor(
		private readonly databaseServicePostgreSQL: DatabaseServicePostgreSQL
	) {}

	async getFactoryDetails(factoryId) {
		const factoryDetails = await this.databaseServicePostgreSQL.query(
			`SELECT * FROM factory_details WHERE factory_id=${factoryId}`
		)
		return factoryDetails.rows
	}

	async updateFactoryDetails(id, updateFactoryDetailsDto) {
		const updatedFactoryDetails = await this.databaseServicePostgreSQL.query(
			`UPDATE factory_details SET using_unit='${updateFactoryDetailsDto.using_unit}', 
			date_range='${updateFactoryDetailsDto.date_range}'::daterange, 
			usage_kw='${updateFactoryDetailsDto.usage_kw}', 
			usage_cost='${updateFactoryDetailsDto.usage_cost}', 
			discount='${updateFactoryDetailsDto.discount}'
			WHERE id=${id}`
		)
		return updatedFactoryDetails
	}
}
