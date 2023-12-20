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
				`SELECT 
				id, 
				using_unit,
				lower(date_range) || ' / ' || upper(date_range) AS date_range,
				usage_kw,
				usage_cost,
				discount,
				factory_id
				FROM
				factory_details
				WHERE factory_id=${factoryId}
				ORDER BY using_unit`
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
				usage_kw=${updateFactoryDetailsDto.usage_kw}, 
				usage_cost=${updateFactoryDetailsDto.usage_cost}, 
				discount=${updateFactoryDetailsDto.discount}
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

	async createFactoryDetails(factoryId, updatedFactoryDetailsDto) {
		try {
			const createdFactoryDetails = await this.databaseServicePostgreSQL.query(
				`INSERT INTO factory_details(
					using_unit, 
					date_range, 
					usage_kw, 
					usage_cost,
					discount,
					factory_id 
					)
				VALUES (
					'${updatedFactoryDetailsDto.using_unit}', 
					'${updatedFactoryDetailsDto.date_range}', 
					${updatedFactoryDetailsDto.usage_kw}, 
					${updatedFactoryDetailsDto.usage_cost}, 
					${updatedFactoryDetailsDto.discount},
					${factoryId}
				)`
			)
			return true
		}
		catch(err) {
			console.log(err.message)
			throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
		}
	}

	async deleteFactoryDetails(id) {
		try {
			const deletedFactoryDetails = await this.databaseServicePostgreSQL.query(
				`DELETE  FROM factory_details WHERE id=${id}`
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
