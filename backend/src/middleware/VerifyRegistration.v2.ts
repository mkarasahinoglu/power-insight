import { Injectable, NestMiddleware, ConflictException, HttpException, HttpStatus } from "@nestjs/common"
import { Model } from "mongoose"
import { Request, Response, NextFunction } from "express"
import { InjectModel } from "@nestjs/mongoose"
import { IUser } from "src/user.v2/user.model"

@Injectable()
export class VerifyRegistrationV2 implements NestMiddleware {
  constructor(@InjectModel("User") private readonly userModel: Model<IUser>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUser = await this.userModel.findOne({email: req.body.email})
      if(foundUser) {
        throw new ConflictException("This email is already in use")
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