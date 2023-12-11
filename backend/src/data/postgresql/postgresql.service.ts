// database.service.ts
import { Injectable } from "@nestjs/common"
import { Pool, Client } from "pg"

@Injectable()
export class DatabaseServicePostgreSQL {
	private readonly pool: Pool
	private client: Client

	constructor() {
		this.pool = new Pool({
			connectionString:
				"postgres://jitctjac:JW0-o9if_sbd06Ql1UNkuZzJCtgAWZzs@bubble.db.elephantsql.com/jitctjac"
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
