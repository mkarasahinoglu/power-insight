import { Injectable } from "@nestjs/common"
import { DatabaseServicePostgreSQL } from "src/data/postgresql/postgresql.service"

@Injectable()
export class FactoryListService {
	constructor(
		private readonly databaseServicePostgreSQL: DatabaseServicePostgreSQL
	) {}

	async getFactories() {
		const factories = await this.databaseServicePostgreSQL.query(
			"SELECT * FROM factory_list"
		)
		return factories.rows
	}

	async updateFactory(id, updateFactoryDto) {
		const updatedFactory = await this.databaseServicePostgreSQL.query(
			`UPDATE factory_list SET name='${updateFactoryDto.name}', 
			membership_start_date='${updateFactoryDto.membership_start_date}', 
			membership_end_date='${updateFactoryDto.membership_end_date}', 
			employee_count='${updateFactoryDto.employee_count}', 
			free_membership='${updateFactoryDto.free_membership}'
			WHERE id=${id}`
		)
		return updatedFactory
	}
}
