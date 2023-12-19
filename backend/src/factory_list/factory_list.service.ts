import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { DatabaseServicePostgreSQL } from "src/data/postgresql/postgresql.service"

@Injectable()
export class FactoryListService {
	constructor(
		private readonly databaseServicePostgreSQL: DatabaseServicePostgreSQL
	) {}

	async getFactories() {
		try {
			const factories = await this.databaseServicePostgreSQL.query(
				`SELECT id, name, TO_CHAR(membership_start_date, 'YYYY-MM-DD') AS membership_start_date, 
				TO_CHAR(membership_end_date, 'YYYY-MM-DD') AS membership_end_date,
				employee_count,
				free_membership
				FROM
				factory_list
				ORDER BY id`
			)
			return factories.rows
		}
		catch(err) {
			throw new HttpException(
        err?.message || "An unexpected error occurred",
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
		}
	}

	async updateFactory(id, updateFactoryDto) {
		try {
			const updatedFactory = await this.databaseServicePostgreSQL.query(
				`UPDATE factory_list SET name='${updateFactoryDto.name}', 
				membership_start_date='${updateFactoryDto.membership_start_date}', 
				membership_end_date='${updateFactoryDto.membership_end_date}', 
				employee_count='${updateFactoryDto.employee_count}', 
				free_membership='${updateFactoryDto.free_membership}'
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

	async createFactory(updatedFactoryDto) {
		try {
			const createdFactory = await this.databaseServicePostgreSQL.query(
				`INSERT INTO factory_list(
					name, 
					membership_start_date, 
					membership_end_date, 
					employee_count,
					free_membership 
					)
				VALUES (
					'${updatedFactoryDto.name}', 
					'${updatedFactoryDto.membership_start_date}', 
					'${updatedFactoryDto.membership_end_date}', 
					${updatedFactoryDto.employee_count}, 
					${updatedFactoryDto.free_membership}
				)`
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

	async deleteFactory(id) {
		try {
			const deletedFactory = await this.databaseServicePostgreSQL.query(
				`BEGIN;
				 DELETE FROM factory_details WHERE factory_id=${id};
				 DELETE FROM factory_list WHERE id=${id};
				 COMMIT;`
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
