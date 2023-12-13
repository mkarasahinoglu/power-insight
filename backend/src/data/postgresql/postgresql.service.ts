import { Injectable } from "@nestjs/common"
import { Pool, Client } from "pg"

@Injectable()
export class DatabaseServicePostgreSQL {
	private readonly pool: Pool
	private client: Client

	constructor() {
		this.pool = new Pool({
			connectionString:
				process.env.POSTGRESQL_CONNECTION_STRING
		})
	}
	
	async query(query: string) {
		this.client = await this.pool.connect()
		try {
			return await this.client.query(query)
		} finally {
			this.client.release()
		}
	}
}
