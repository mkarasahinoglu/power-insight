import { Injectable, NestMiddleware, ConflictException, HttpException, HttpStatus } from "@nestjs/common"
import { DatabaseServiceElasticSearch } from "src/data/elasticsearch/elasticsearch.service"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class VerifyRegistration implements NestMiddleware {
  constructor(private readonly databaseServiceElasticSearch:DatabaseServiceElasticSearch) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.databaseServiceElasticSearch.getClient().search({
        query: {
          term: {
            "email.keyword" : req.body.email
          }
        }
      })
      
      if(user.hits.hits.length > 0) {
        throw new ConflictException("This email is already in use. Please try another email")
      }
  
      next()
    }
    catch (err) {
      throw new HttpException(
        err.message || "An unexpected error occured",
        err.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    
  }
}