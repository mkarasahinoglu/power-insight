import { Injectable } from "@nestjs/common"
import { Client } from "@elastic/elasticsearch"

@Injectable()
export class DatabaseServiceElasticSearch {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_NODE,
      auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD
      },
    })
  }

  getClient(): Client {
    return this.client
  }
}
